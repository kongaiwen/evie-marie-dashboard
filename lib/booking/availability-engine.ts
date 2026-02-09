import {
  BookingCategory,
  BookingSubcategory,
  TimeSlot,
  AvailabilitySlot,
  GoogleCalendarEvent,
  AVAILABILITY_CONSTRAINTS,
  AvailabilityConstraint,
} from './types';
import { addDays, setHours, setMinutes, isSameDay, isWeekend, differenceInMinutes, addMinutes } from 'date-fns';

// Parse time string (HH:mm) and set it on a date
function setTimeFromDate(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

// Check if a date falls within a time range
function isWithinTimeRange(date: Date, startTime: string, endTime: string): boolean {
  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  const startMinutesTotal = startHours * 60 + startMinutes;
  const endMinutesTotal = endHours * 60 + endMinutes;

  return currentMinutes >= startMinutesTotal && currentMinutes < endMinutesTotal;
}

// Check if a date falls within a day range
function isWithinDayRange(date: Date, startDay: number, endDay: number): boolean {
  const day = date.getDay();
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
    const isWeekendDay = isWeekend(currentDate);

    // Determine if we should generate slots for this day
    let shouldGenerate = false;
    let startTime: string;
    let endTime: string;

    if (isWeekendDay && constraint.weekendStartTime !== undefined) {
      shouldGenerate = isWithinDayRange(
        currentDate,
        constraint.weekendStart!,
        constraint.weekendEnd!
      );
      startTime = constraint.weekendStartTime!;
      endTime = constraint.weekendEndTime!;
    } else {
      shouldGenerate = isWithinDayRange(currentDate, constraint.weekdayStart, constraint.weekdayEnd);
      startTime = constraint.startTime;
      endTime = constraint.endTime;
    }

    if (shouldGenerate) {
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
  let currentSlotStart: Date | null = null;
  let consecutiveSlots = 0;

  for (const slot of slots) {
    if (slot.available) {
      if (!currentSlotStart) {
        currentSlotStart = slot.start;
      }
      consecutiveSlots++;
    } else {
      if (currentSlotStart && consecutiveSlots * 30 >= minDurationMinutes) {
        availableSlots.push({
          start: currentSlotStart,
          end: slot.start,
          available: true,
        });
      }
      currentSlotStart = null;
      consecutiveSlots = 0;
    }
  }

  // Handle last consecutive slots
  if (currentSlotStart && consecutiveSlots * 30 >= minDurationMinutes) {
    const lastSlot = slots[slots.length - 1];
    availableSlots.push({
      start: currentSlotStart,
      end: lastSlot.end,
      available: true,
    });
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
  const filteredSlots = minDurationMinutes
    ? filterByDuration(slots, minDurationMinutes)
    : slots.filter((s) => s.available);

  const slotsByDay = new Map<string, AvailabilitySlot[]>();

  for (const slot of filteredSlots) {
    const dayKey = slot.start.toISOString().split('T')[0];
    if (!slotsByDay.has(dayKey)) {
      slotsByDay.set(dayKey, []);
    }
    slotsByDay.get(dayKey)!.push(slot);
  }

  return slotsByDay;
}
