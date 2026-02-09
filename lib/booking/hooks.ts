/**
 * Booking System React Hooks
 *
 * This file contains custom React hooks for managing booking state,
 * including availability fetching, booking submission, and calendar integration.
 */

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  DayAvailability,
  BookingRequest,
  BookingConfirmation,
  AvailabilityQuery,
  BookingFormErrors,
} from './types';
import {
  fetchAvailability,
  submitBooking,
  validateBooking,
  BookingApiError,
} from './api-client';
import { bookingToCalendarEvent, downloadICS, openCalendarLink, generateCalendarLinks } from './calendar-utils';

/**
 * Hook for fetching and managing availability data
 *
 * @param query - Availability query parameters
 * @returns Object with availability data, loading state, and error state
 */
export function useAvailability(query: AvailabilityQuery) {
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchAvailability(query);
      setAvailability(data);
    } catch (err) {
      const errorMessage = err instanceof BookingApiError ? err.message : 'Failed to fetch availability';
      setError(errorMessage);
      console.error('Error fetching availability:', err);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    availability,
    isLoading,
    error,
    refetch: fetch,
  };
}

/**
 * Hook for managing booking form state and submission
 *
 * @returns Object with form state, validation, and submission handlers
 */
export function useBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [validationErrors, setValidationErrors] = useState<BookingFormErrors>({});

  const submit = useCallback(async (booking: BookingRequest) => {
    setIsSubmitting(true);
    setError(null);
    setConfirmation(null);
    setValidationErrors({});

    // Validate form
    const validation = validateBooking(booking);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setIsSubmitting(false);
      return { success: false, errors: validation.errors };
    }

    try {
      const result = await submitBooking(booking);
      setConfirmation(result);
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof BookingApiError ? err.message : 'Failed to submit booking';
      setError(errorMessage);
      console.error('Error submitting booking:', err);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setError(null);
    setConfirmation(null);
    setValidationErrors({});
  }, []);

  return {
    isSubmitting,
    error,
    confirmation,
    validationErrors,
    submit,
    reset,
  };
}

/**
 * Hook for managing "Add to Calendar" functionality
 *
 * @param confirmation - Booking confirmation data
 * @returns Object with calendar integration functions
 */
export function useCalendarIntegration(confirmation: BookingConfirmation | null) {
  const [calendarLinks, setCalendarLinks] = useState(generateCalendarLinks(
    confirmation ? bookingToCalendarEvent(confirmation) : {} as any
  ));

  useEffect(() => {
    if (confirmation) {
      const event = bookingToCalendarEvent(confirmation);
      setCalendarLinks(generateCalendarLinks(event));
    }
  }, [confirmation]);

  const addToGoogle = useCallback(() => {
    if (confirmation) {
      const event = bookingToCalendarEvent(confirmation);
      openCalendarLink(generateCalendarLinks(event).google);
    }
  }, [confirmation]);

  const addToOutlook = useCallback(() => {
    if (confirmation) {
      const event = bookingToCalendarEvent(confirmation);
      openCalendarLink(generateCalendarLinks(event).outlook);
    }
  }, [confirmation]);

  const addToApple = useCallback(() => {
    if (confirmation) {
      const event = bookingToCalendarEvent(confirmation);
      openCalendarLink(generateCalendarLinks(event).apple);
    }
  }, [confirmation]);

  const downloadICSFile = useCallback(() => {
    if (confirmation) {
      const event = bookingToCalendarEvent(confirmation);
      const filename = `booking-${confirmation.bookingId}.ics`;
      downloadICS(event, filename);
    }
  }, [confirmation]);

  return {
    calendarLinks,
    addToGoogle,
    addToOutlook,
    addToApple,
    downloadICS: downloadICSFile,
  };
}

/**
 * Hook for managing loading and error states with retry functionality
 *
 * @returns Object with loading state management functions
 */
export function useAsyncState() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const execute = useCallback(async <T,>(
    asyncFn: () => Promise<T>,
    maxRetries = 3
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await asyncFn();
        setRetryCount(attempt);
        return result;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error('Unknown error');
        if (attempt < maxRetries) {
          // Exponential backoff: 2^attempt * 100ms
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
        }
      }
    }

    setError(lastError?.message || 'An error occurred');
    setIsLoading(false);
    return null;
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setRetryCount(0);
  }, []);

  return {
    isLoading,
    error,
    retryCount,
    execute,
    reset,
  };
}

/**
 * Hook for debouncing async operations (useful for search/filter inputs)
 *
 * @param delay - Delay in milliseconds
 * @returns Object with debounced execute function
 */
export function useDebounce(delay = 300) {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedExecute = useCallback(<T,>(
    fn: () => Promise<T>
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      setIsDebouncing(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          const result = await fn();
          setIsDebouncing(false);
          resolve(result);
        } catch (error) {
          setIsDebouncing(false);
          reject(error);
        }
      }, delay);
    });
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isDebouncing,
    execute: debouncedExecute,
  };
}
