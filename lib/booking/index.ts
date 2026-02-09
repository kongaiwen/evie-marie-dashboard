/**
 * Booking System Integration Layer
 *
 * This is the main entry point for all booking-related functionality.
 * It exports types, API clients, utilities, and React hooks for use in components.
 *
 * Usage:
 *   import { useAvailability, useBookingForm, useCalendarIntegration } from '@/lib/booking';
 *   import { BookingRequest, BookingConfirmation } from '@/lib/booking';
 */

// Types
export type {
  BookingType,
  SlotDuration,
  SlotStatus,
  TimeSlot,
  DayAvailability,
  AvailabilityQuery,
  ContactInfo,
  BookingDetails,
  MeetingAgenda,
  BookingRequest,
  BookingConfirmation,
  CalendarLinks,
  ApiResponse,
  BookingErrorCode,
  BookingFormErrors,
  CalendarEvent,
} from './types';

// API Client
export {
  fetchAvailability,
  submitBooking,
  cancelBooking,
  rescheduleBooking,
  validateBooking,
  BookingApiError,
} from './api-client';

// Calendar Utilities
export {
  generateGoogleCalendarLink,
  generateOutlookCalendarLink,
  generateYahooCalendarLink,
  generateAppleCalendarLink,
  generateICSContent,
  downloadICS,
  generateCalendarLinks,
  openCalendarLink,
  bookingToCalendarEvent,
} from './calendar-utils';

// React Hooks
export {
  useAvailability,
  useBookingForm,
  useCalendarIntegration,
  useAsyncState,
  useDebounce,
} from './hooks';

// Re-export enums for convenience
export { BookingErrorCode } from './types';
