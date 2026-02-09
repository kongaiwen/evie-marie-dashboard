/**
 * Booking API Adapter
 *
 * This file provides adapter functions to bridge between Agent 1's backend API
 * and Agent 4's frontend integration layer. It handles type conversions and
 * data structure transformations.
 */

import {
  DayAvailability,
  TimeSlot,
  SlotStatus,
  AvailabilityQuery,
  BookingRequest as FrontendBookingRequest,
  BookingConfirmation,
  BookingType,
  ContactInfo,
  BookingDetails,
} from './types';

/**
 * Agent 1's backend types (from their API)
 */
interface Agent1TimeSlot {
  start: string;
  end: string;
  available: boolean;
  reason?: string;
}

interface Agent1AvailabilityResponse {
  category: string;
  subcategory: string;
  startDate: string;
  endDate: string;
  availability: Record<string, Agent1TimeSlot[]> | Agent1TimeSlot[];
  totalEvents: number;
}

/**
 * Convert Agent 1's category/subcategory to our BookingType
 */
function mapCategoryToBookingType(category: string, subcategory: string): BookingType {
  const categoryUpper = category.toUpperCase();
  const subcategoryLower = subcategory.toLowerCase();

  if (categoryUpper === 'PROFESSIONAL') {
    if (subcategoryLower.includes('interview')) {
      return 'consultation';
    }
    if (subcategoryLower.includes('collaboration')) {
      return 'discovery';
    }
    if (subcategoryLower.includes('presentation')) {
      return 'presentation';
    }
    return 'discovery'; // Default for professional
  }

  // Friends and kid activities default to discovery
  return 'discovery';
}

/**
 * Convert Agent 1's slot status to our SlotStatus
 */
function mapSlotStatus(available: boolean, reason?: string): SlotStatus {
  if (!available) {
    if (reason?.toLowerCase().includes('past')) {
      return 'past';
    }
    return 'booked';
  }
  return 'available';
}

/**
 * Convert Agent 1's time slot to our TimeSlot
 */
function mapTimeSlot(
  slot: Agent1TimeSlot,
  index: number
): TimeSlot {
  return {
    id: `slot-${Date.now()}-${index}`,
    startTime: slot.start,
    endTime: slot.end,
    status: mapSlotStatus(slot.available, slot.reason),
  };
}

/**
 * Convert Agent 1's availability response to our DayAvailability array
 *
 * Handles both grouped-by-day and flat response formats
 */
export function adaptAvailabilityResponse(
  agent1Response: Agent1AvailabilityResponse
): DayAvailability[] {
  const availability = agent1Response.availability;
  const result: DayAvailability[] = [];

  // Check if availability is grouped by day (object) or flat (array)
  if (Array.isArray(availability)) {
    // Flat array format - group by date ourselves
    const slotsByDate = new Map<string, Agent1TimeSlot[]>();

    availability.forEach((slot) => {
      const date = slot.start.split('T')[0];
      if (!slotsByDate.has(date)) {
        slotsByDate.set(date, []);
      }
      slotsByDate.get(date)!.push(slot);
    });

    // Convert to DayAvailability format
    slotsByDate.forEach((slots, date) => {
      result.push({
        date,
        slots: slots.map((slot, index) => mapTimeSlot(slot, index)),
      });
    });
  } else {
    // Grouped by day format (object with date keys)
    Object.entries(availability).forEach(([date, slots]) => {
      result.push({
        date,
        slots: slots.map((slot, index) => mapTimeSlot(slot, index)),
      });
    });
  }

  return result;
}

/**
 * Convert our AvailabilityQuery to Agent 1's query parameters
 */
export function adaptAvailabilityQuery(query: AvailabilityQuery): {
  category: string;
  subcategory: string;
  start: string;
  end: string;
  groupByDay: string;
} {
  // Map our BookingType to Agent 1's category/subcategory
  let category = 'PROFESSIONAL';
  let subcategory = 'Informational Interview';

  switch (query.bookingType) {
    case 'discovery':
      category = 'PROFESSIONAL';
      subcategory = 'Collaboration Exploration';
      break;
    case 'consultation':
      category = 'PROFESSIONAL';
      subcategory = 'Job Interview';
      break;
    case 'presentation':
      category = 'PROFESSIONAL';
      subcategory = 'Networking';
      break;
  }

  return {
    category,
    subcategory,
    start: query.startDate,
    end: query.endDate,
    groupByDay: 'true', // Always request grouped format for consistency
  };
}

/**
 * Convert our BookingRequest to Agent 1's booking request format
 */
export function adaptBookingRequest(booking: FrontendBookingRequest): {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  category: string;
  subcategory: string;
  startTime: string;
  endTime: string;
} {
  const { contactInfo, bookingDetails, agenda } = booking;

  // Map BookingType to Agent 1's category/subcategory
  let category = 'PROFESSIONAL';
  let subcategory = 'Informational Interview';

  switch (bookingDetails.bookingType) {
    case 'discovery':
      category = 'PROFESSIONAL';
      subcategory = 'Collaboration Exploration';
      break;
    case 'consultation':
      category = 'PROFESSIONAL';
      subcategory = 'Job Interview';
      break;
    case 'presentation':
      category = 'PROFESSIONAL';
      subcategory = 'Networking';
      break;
  }

  return {
    name: `${contactInfo.firstName} ${contactInfo.lastName}`,
    email: contactInfo.email,
    phone: contactInfo.phone,
    notes: agenda
      ? `Topics: ${agenda.topics.join(', ')}\n${agenda.additionalNotes || ''}`
      : undefined,
    category,
    subcategory,
    startTime: bookingDetails.startTime,
    endTime: bookingDetails.endTime,
  };
}

/**
 * Convert Agent 1's booking response to our BookingConfirmation
 */
export function adaptBookingResponse(
  agent1Response: any,
  bookingDetails: BookingDetails,
  contactInfo: ContactInfo
): BookingConfirmation {
  return {
    bookingId: agent1Response.eventId || `booking-${Date.now()}`,
    status: agent1Response.success ? 'confirmed' : 'pending',
    bookingDetails,
    contactInfo,
    calendarLinks: {
      google: '',
      outlook: '',
      apple: '',
      icsDownload: '',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Build query string for Agent 1's availability API
 */
export function buildAvailabilityQueryParams(query: AvailabilityQuery): string {
  const adapted = adaptAvailabilityQuery(query);
  const params = new URLSearchParams({
    category: adapted.category,
    subcategory: adapted.subcategory,
    start: adapted.start,
    end: adapted.end,
    groupByDay: adapted.groupByDay,
  });
  return params.toString();
}
