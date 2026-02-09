/**
 * Booking System Types
 *
 * This file contains all TypeScript types and interfaces for the booking system.
 * These types are shared between the frontend and backend API.
 */

/**
 * Available booking types
 */
export type BookingType = 'discovery' | 'consultation' | 'presentation';

/**
 * Duration options for booking slots
 */
export type SlotDuration = 30 | 45 | 60 | 90;

/**
 * Time slot availability status
 */
export type SlotStatus = 'available' | 'booked' | 'unavailable' | 'past';

/**
 * Individual time slot for a specific date
 */
export interface TimeSlot {
  id: string;
  startTime: string; // ISO 8601 format
  endTime: string;   // ISO 8601 format
  status: SlotStatus;
  bookingType?: BookingType;
}

/**
 * Available slots for a specific date
 */
export interface DayAvailability {
  date: string; // YYYY-MM-DD format
  slots: TimeSlot[];
}

/**
 * Availability query parameters
 */
export interface AvailabilityQuery {
  startDate: string; // YYYY-MM-DD format
  endDate: string;   // YYYY-MM-DD format
  bookingType?: BookingType;
}

/**
 * Contact information for the booking
 */
export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
}

/**
 * Booking details
 */
export interface BookingDetails {
  bookingType: BookingType;
  slotId: string;
  startTime: string; // ISO 8601 format
  endTime: string;   // ISO 8601 format
  timezone: string;
}

/**
 * Meeting agenda/topics
 */
export interface MeetingAgenda {
  topics: string[];
  additionalNotes?: string;
}

/**
 * Complete booking request
 */
export interface BookingRequest {
  contactInfo: ContactInfo;
  bookingDetails: BookingDetails;
  agenda?: MeetingAgenda;
}

/**
 * Booking confirmation response
 */
export interface BookingConfirmation {
  bookingId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDetails: BookingDetails;
  contactInfo: ContactInfo;
  calendarLinks: CalendarLinks;
  createdAt: string;
  updatedAt: string;
}

/**
 * Calendar event links for "Add to Calendar" functionality
 */
export interface CalendarLinks {
  google: string;
  outlook: string;
  apple: string;
  yahoo?: string;
  icsDownload: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * API error types
 */
export enum BookingErrorCode {
  SLOT_UNAVAILABLE = 'SLOT_UNAVAILABLE',
  INVALID_DATE_RANGE = 'INVALID_DATE_RANGE',
  INVALID_EMAIL = 'INVALID_EMAIL',
  SLOT_ALREADY_BOOKED = 'SLOT_ALREADY_BOOKED',
  SERVER_ERROR = 'SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

/**
 * Booking form validation errors
 */
export interface BookingFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  slotId?: string;
  timezone?: string;
  topics?: string;
}

/**
 * Calendar event data for generating calendar links
 */
export interface CalendarEvent {
  title: string;
  description: string;
  location?: string;
  startTime: string; // ISO 8601 format
  endTime: string;   // ISO 8601 format
  attendees: Array<{
    email: string;
    name?: string;
  }>;
}
