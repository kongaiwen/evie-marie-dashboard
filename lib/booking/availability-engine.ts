import {
  BookingCategory,
  BookingSubcategory,
  AvailabilitySlot,
  GoogleCalendarEvent,
  AVAILABILITY_CONSTRAINTS,
  AvailabilityConstraint,
} from './types';
import { addDays, differenceInMinutes, addMinutes } from 'date-fns';

// Parse time string (HH:mm) and set it on a date
function setTimeFromDate(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

// Check if a date falls within a day range (handles wrap-around for Sun=0)
function isWithinDayRange(date: Date, startDay: number, endDay: number): boolean {
  const day = date.getDay();

  // Handle wrap-around case (e.g., Sunday=0 to Saturday=6)
  if (startDay > endDay) {
    // Range wraps around weekend (e.g., 1-5 means Mon-Fri, 0-0 means Sunday only)
    return day >= startDay || day <= endDay;
  }

  // Normal range (e.g., 0-6 means all days)
  return day >= startDay && day <= endDay;
}

// Generate time slots for a specific date range
function generateTimeSlots(
  startDate: Date,
  endDate: Date,
  constraint: AvailabilityConstraint,
  events: GoogleCalendarEvent[]
): AvailabilitySlot[] {
  const slots: AvailabilitySlot[] = [];
  const slotDurationMinutes = 30; // 30-minute slots

  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);

  while (currentDate <= endDate) {
    const day = currentDate.getDay();

    // Determine if we should generate slots for this day
    let shouldGenerate = false;
    let startTime: string | undefined;
    let endTime: string | undefined;

    // Check if this is a weekend day (Saturday=6, Sunday=0)
    const isWeekendDay = day === 0 || day === 6;

    if (isWeekendDay && constraint.weekendStartTime !== undefined) {
      shouldGenerate = isWithinDayRange(
        currentDate,
        constraint.weekendStart!,
        constraint.weekendEnd!
      );
      startTime = constraint.weekendStartTime!;
      endTime = constraint.weekendEndTime!;
    } else if (!isWeekendDay) {
      shouldGenerate = isWithinDayRange(currentDate, constraint.weekdayStart, constraint.weekdayEnd);
      startTime = constraint.startTime;
      endTime = constraint.endTime;
    }

    if (shouldGenerate && startTime && endTime) {
      // Generate slots for this day
      let slotStart = setTimeFromDate(currentDate, startTime);
      const slotEnd = setTimeFromDate(currentDate, endTime);

      while (slotStart < slotEnd) {
        const slotEndWithDuration = addMinutes(slotStart, slotDurationMinutes);

        // Check if this slot conflicts with any events
        const conflictingEvent = events.find((event) => {
          return (
            event.busy &&
            ((slotStart >= event.start && slotStart < event.end) ||
              (slotEndWithDuration > event.start && slotEndWithDuration <= event.end) ||
              (slotStart <= event.start && slotEndWithDuration >= event.end))
          );
        });

        slots.push({
          start: new Date(slotStart),
          end: new Date(slotEndWithDuration),
          available: !conflictingEvent,
          reason: conflictingEvent ? `Booked: ${conflictingEvent.summary}` : undefined,
        });

        slotStart = slotEndWithDuration;
      }
    }

    currentDate = addDays(currentDate, 1);
  }

  return slots;
}

// Get availability for a specific category and subcategory
export function getAvailability(
  category: BookingCategory,
  subcategory: BookingSubcategory,
  startDate: Date,
  endDate: Date,
  events: GoogleCalendarEvent[]
): AvailabilitySlot[] {
  // Find the constraint for this category/subcategory
  const constraint = AVAILABILITY_CONSTRAINTS.find(
    (c) => c.category === category && c.subcategory === subcategory
  );

  if (!constraint) {
    console.warn(`No availability constraint found for ${category}/${subcategory}`);
    return [];
  }

  return generateTimeSlots(startDate, endDate, constraint, events);
}

// Get availability for all categories
export function getAllAvailability(
  startDate: Date,
  endDate: Date,
  events: GoogleCalendarEvent[]
): Map<string, AvailabilitySlot[]> {
  const availabilityMap = new Map<string, AvailabilitySlot[]>();

  for (const constraint of AVAILABILITY_CONSTRAINTS) {
    const key = `${constraint.category}:${constraint.subcategory}`;
    const slots = generateTimeSlots(startDate, endDate, constraint, events);
    availabilityMap.set(key, slots);
  }

  return availabilityMap;
}

// Filter available slots by minimum duration
export function filterByDuration(slots: AvailabilitySlot[], minDurationMinutes: number): AvailabilitySlot[] {
  const availableSlots: AvailabilitySlot[] = [];

  for (let i = 0; i < slots.length; i++) {
    if (!slots[i].available) continue;

    // Find consecutive available slots starting from this one
    let totalDuration = 0;
    let endIndex = i;

    while (endIndex < slots.length && slots[endIndex].available) {
      totalDuration += differenceInMinutes(slots[endIndex].end, slots[endIndex].start);
      endIndex++;

      if (totalDuration >= minDurationMinutes) {
        break;
      }
    }

    // Only add if we found enough consecutive time
    if (totalDuration >= minDurationMinutes) {
      availableSlots.push({
        start: slots[i].start,
        end: slots[endIndex - 1].end,
        available: true,
      });
    }

    // Skip ahead to the end of this consecutive block
    i = endIndex - 1;
  }

  return availableSlots;
}

// Get available slots grouped by day for easy frontend consumption
export function getAvailabilityByDay(
  category: BookingCategory,
  subcategory: BookingSubcategory,
  startDate: Date,
  endDate: Date,
  events: GoogleCalendarEvent[],
  minDurationMinutes?: number
): Map<string, AvailabilitySlot[]> {
  const slots = getAvailability(category, subcategory, startDate, endDate, events);

  // If minDuration is specified, filter by consecutive available time
  // Otherwise, just show individual available 30-minute slots
  let filteredSlots = minDurationMinutes
    ? filterByDuration(slots, minDurationMinutes)
    : slots.filter((s) => s.available);

  const slotsByDay = new Map<string, AvailabilitySlot[]>();

  for (const slot of filteredSlots) {
    // Use UTC date string to avoid timezone issues
    const dateStr = slot.start.toISOString().split('T')[0];
    if (!slotsByDay.has(dateStr)) {
      slotsByDay.set(dateStr, []);
    }
    slotsByDay.get(dateStr)!.push(slot);
  }

  return slotsByDay;
}
