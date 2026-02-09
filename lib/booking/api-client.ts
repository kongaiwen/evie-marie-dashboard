/**
 * Booking API Client
 *
 * This file contains all functions for communicating with the booking backend API.
 * It handles availability fetching, booking submissions, and error states.
 */

import {
  ApiResponse,
  AvailabilityQuery,
  DayAvailability,
  BookingRequest,
  BookingConfirmation,
  BookingErrorCode,
} from './types';

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
    const params = new URLSearchParams({
      startDate: query.startDate,
      endDate: query.endDate,
      ...(query.bookingType && { bookingType: query.bookingType }),
    });

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

    const data: ApiResponse<DayAvailability[]> = await response.json();

    if (!data.success || !data.data) {
      throw new BookingApiError(
        BookingErrorCode.SERVER_ERROR,
        data.error?.message || 'Failed to fetch availability',
        data.error?.details
      );
    }

    return data.data;
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
    const response = await fetch(`${API_BASE_URL}/booking/create`, {
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

    const data: ApiResponse<BookingConfirmation> = await response.json();

    if (!data.success || !data.data) {
      throw new BookingApiError(
        data.error?.code as BookingErrorCode || BookingErrorCode.VALIDATION_ERROR,
        data.error?.message || 'Failed to submit booking',
        data.error?.details
      );
    }

    return data.data;
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
 * Cancel an existing booking
 *
 * @param bookingId - ID of the booking to cancel
 * @returns Updated booking confirmation
 * @throws BookingApiError on API errors
 */
export async function cancelBooking(
  bookingId: string
): Promise<BookingConfirmation> {
  try {
    const response = await fetch(`${API_BASE_URL}/booking/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new BookingApiError(
        BookingErrorCode.SERVER_ERROR,
        errorData.error || 'Failed to cancel booking',
        errorData
      );
    }

    const data: ApiResponse<BookingConfirmation> = await response.json();

    if (!data.success || !data.data) {
      throw new BookingApiError(
        BookingErrorCode.SERVER_ERROR,
        data.error?.message || 'Failed to cancel booking',
        data.error?.details
      );
    }

    return data.data;
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
 * Reschedule an existing booking
 *
 * @param bookingId - ID of the booking to reschedule
 * @param newSlotId - ID of the new time slot
 * @returns Updated booking confirmation
 * @throws BookingApiError on API errors
 */
export async function rescheduleBooking(
  bookingId: string,
  newSlotId: string
): Promise<BookingConfirmation> {
  try {
    const response = await fetch(`${API_BASE_URL}/booking/${bookingId}/reschedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newSlotId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new BookingApiError(
        BookingErrorCode.SERVER_ERROR,
        errorData.error || 'Failed to reschedule booking',
        errorData
      );
    }

    const data: ApiResponse<BookingConfirmation> = await response.json();

    if (!data.success || !data.data) {
      throw new BookingApiError(
        BookingErrorCode.SERVER_ERROR,
        data.error?.message || 'Failed to reschedule booking',
        data.error?.details
      );
    }

    return data.data;
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

  // Validate contact info
  if (!booking.contactInfo.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  if (!booking.contactInfo.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  if (!booking.contactInfo.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.contactInfo.email)) {
    errors.email = 'Invalid email format';
  }

  // Validate booking details
  if (!booking.bookingDetails.slotId) {
    errors.slotId = 'Time slot is required';
  }
  if (!booking.bookingDetails.timezone) {
    errors.timezone = 'Timezone is required';
  }

  // Validate agenda
  if (booking.agenda && (!booking.agenda.topics || booking.agenda.topics.length === 0)) {
    errors.topics = 'Please select at least one topic';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
