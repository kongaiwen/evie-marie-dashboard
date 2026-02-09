/**
 * Booking API Client
 *
 * This file contains all functions for communicating with the booking backend API.
 * It handles availability fetching, booking submissions, and error states.
 */

import {
  AvailabilityQuery,
  DayAvailability,
  BookingRequest,
  BookingConfirmation,
  BookingErrorCode,
} from './types';
import {
  adaptAvailabilityResponse,
  buildAvailabilityQueryParams,
} from './adapter';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Custom error class for booking API errors
 */
export class BookingApiError extends Error {
  code: BookingErrorCode;
  details?: Record<string, unknown>;

  constructor(code: BookingErrorCode, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'BookingApiError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Fetch availability slots for a date range
 *
 * @param query - Availability query parameters
 * @returns Array of day availability data
 * @throws BookingApiError on API errors
 */
export async function fetchAvailability(
  query: AvailabilityQuery
): Promise<DayAvailability[]> {
  try {
    // Build query params using adapter to match Agent 1's API
    const params = buildAvailabilityQueryParams(query);

    const response = await fetch(`${API_BASE_URL}/booking/availability?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new BookingApiError(
        BookingErrorCode.SERVER_ERROR,
        errorData.error || 'Failed to fetch availability',
        errorData
      );
    }

    const agent1Response = await response.json();
    const adaptedData = adaptAvailabilityResponse(agent1Response);

    return adaptedData;
  } catch (error) {
    if (error instanceof BookingApiError) {
      throw error;
    }
    throw new BookingApiError(
      BookingErrorCode.SERVER_ERROR,
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

/**
 * Submit a booking request
 *
 * @param booking - Booking request data
 * @returns Booking confirmation with calendar links
 * @throws BookingApiError on validation or API errors
 */
export async function submitBooking(
  booking: BookingRequest
): Promise<BookingConfirmation> {
  try {
    const response = await fetch(`${API_BASE_URL}/booking/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new BookingApiError(
        BookingErrorCode.SERVER_ERROR,
        errorData.error || 'Failed to submit booking',
        errorData
      );
    }

    const agent1Response = await response.json();

    if (!agent1Response.success) {
      throw new BookingApiError(
        BookingErrorCode.VALIDATION_ERROR,
        agent1Response.message || 'Failed to submit booking'
      );
    }

    // Create a BookingConfirmation from the API response
    const confirmation: BookingConfirmation = {
      bookingId: agent1Response.eventId || `booking-${Date.now()}`,
      status: 'confirmed',
      bookingDetails: {
        bookingType: 'discovery', // Default value
        slotId: 'manual',
        startTime: booking.startTime,
        endTime: booking.endTime,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      contactInfo: {
        firstName: booking.name.split(' ')[0] || '',
        lastName: booking.name.split(' ').slice(1).join(' ') || '',
        email: booking.email,
        phone: booking.phone,
      },
      calendarLinks: {
        google: '',
        outlook: '',
        apple: '',
        icsDownload: '',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return confirmation;
  } catch (error) {
    if (error instanceof BookingApiError) {
      throw error;
    }
    throw new BookingApiError(
      BookingErrorCode.SERVER_ERROR,
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

/**
 * Validate booking data before submission
 *
 * @param booking - Booking request to validate
 * @returns Object with isValid flag and errors object
 */
export function validateBooking(
  booking: BookingRequest
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validate name
  if (!booking.name?.trim()) {
    errors.name = 'Name is required';
  }

  // Validate email
  if (!booking.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
    errors.email = 'Invalid email format';
  }

  // Validate category and subcategory
  if (!booking.category) {
    errors.category = 'Category is required';
  }
  if (!booking.subcategory) {
    errors.subcategory = 'Subcategory is required';
  }

  // Validate times
  if (!booking.startTime) {
    errors.startTime = 'Start time is required';
  }
  if (!booking.endTime) {
    errors.endTime = 'End time is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
