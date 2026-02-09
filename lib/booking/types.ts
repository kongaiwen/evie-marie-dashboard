/**
 * Booking System Types
 *
 * This file contains all TypeScript types and interfaces for the booking system.
 * These types are shared between the frontend and backend API.
 */

/**
 * Main booking categories
 */
export enum BookingCategory {
  PROFESSIONAL = 'professional',
  FRIENDS = 'friends',
  KID_ACTIVITIES = 'kid_activities',
}

/**
 * Professional subcategories
 */
export enum ProfessionalSubcategory {
  JOB_INTERVIEW = 'job_interview',
  INFORMATIONAL_INTERVIEW = 'informational_interview',
  COLLABORATION_EXPLORATION = 'collaboration_exploration',
  NETWORKING = 'networking',
  PAIR_PROGRAMMING = 'pair_programming',
  REMOTE_COWORKING = 'remote_coworking',
}

/**
 * Friends subcategories
 */
export enum FriendsSubcategory {
  COFFEE = 'coffee',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  BRUNCH = 'brunch',
  OUTINGS = 'outings',
  TRIPS_MULTI_DAY = 'trips_multi_day',
}

/**
 * Kid Activities subcategories (same as Friends)
 */
export enum KidActivitiesSubcategory {
  COFFEE = 'coffee',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  BRUNCH = 'brunch',
  OUTINGS = 'outings',
  TRIPS_MULTI_DAY = 'trips_multi_day',
}

/**
 * Union type for all subcategories
 */
export type BookingSubcategory =
  | ProfessionalSubcategory
  | FriendsSubcategory
  | KidActivitiesSubcategory;

/**
 * Day of week (0 = Sunday, 6 = Saturday)
 */
type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Availability constraint for a specific category/subcategory
 */
export interface AvailabilityConstraint {
  category: BookingCategory;
  subcategory: BookingSubcategory;
  weekdayStart: DayOfWeek;
  weekdayEnd: DayOfWeek;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  weekendStart?: DayOfWeek;
  weekendEnd?: DayOfWeek;
  weekendStartTime?: string; // HH:mm format
  weekendEndTime?: string; // HH:mm format
}

/**
 * Availability constraints for all category/subcategory combinations
 */
export const AVAILABILITY_CONSTRAINTS: AvailabilityConstraint[] = [
  // PROFESSIONAL - 10am to 3:30pm on weekdays (Mon-Fri = 1-5)
  {
    category: BookingCategory.PROFESSIONAL,
    subcategory: ProfessionalSubcategory.JOB_INTERVIEW,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '10:00',
    endTime: '15:30',
  },
  {
    category: BookingCategory.PROFESSIONAL,
    subcategory: ProfessionalSubcategory.INFORMATIONAL_INTERVIEW,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '10:00',
    endTime: '15:30',
  },
  {
    category: BookingCategory.PROFESSIONAL,
    subcategory: ProfessionalSubcategory.COLLABORATION_EXPLORATION,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '10:00',
    endTime: '15:30',
  },
  {
    category: BookingCategory.PROFESSIONAL,
    subcategory: ProfessionalSubcategory.NETWORKING,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '10:00',
    endTime: '15:30',
  },
  {
    category: BookingCategory.PROFESSIONAL,
    subcategory: ProfessionalSubcategory.PAIR_PROGRAMMING,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '10:00',
    endTime: '15:30',
  },
  {
    category: BookingCategory.PROFESSIONAL,
    subcategory: ProfessionalSubcategory.REMOTE_COWORKING,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '10:00',
    endTime: '15:30',
  },

  // FRIENDS - COFFEE: 7am-2pm weekdays + weekends
  {
    category: BookingCategory.FRIENDS,
    subcategory: FriendsSubcategory.COFFEE,
    weekdayStart: 1,
    weekdayEnd: 6, // Mon-Sat
    startTime: '07:00',
    endTime: '14:00',
    weekendStart: 0,
    weekendEnd: 0,
    weekendStartTime: '07:00',
    weekendEndTime: '14:00',
  },

  // FRIENDS - LUNCH: 11am-2pm weekdays + 11am-1pm weekends
  {
    category: BookingCategory.FRIENDS,
    subcategory: FriendsSubcategory.LUNCH,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '11:00',
    endTime: '14:00',
    weekendStart: 0,
    weekendEnd: 0,
    weekendStartTime: '11:00',
    weekendEndTime: '13:00',
  },

  // FRIENDS - DINNER: 6pm-midnight daily
  {
    category: BookingCategory.FRIENDS,
    subcategory: FriendsSubcategory.DINNER,
    weekdayStart: 0,
    weekdayEnd: 6,
    startTime: '18:00',
    endTime: '23:59',
  },

  // FRIENDS - BRUNCH: 9:30am-2pm weekdays + 9:30am-1pm weekends
  {
    category: BookingCategory.FRIENDS,
    subcategory: FriendsSubcategory.BRUNCH,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '09:30',
    endTime: '14:00',
    weekendStart: 0,
    weekendEnd: 0,
    weekendStartTime: '09:30',
    weekendEndTime: '13:00',
  },

  // FRIENDS - OUTINGS: 7am-midnight daily
  {
    category: BookingCategory.FRIENDS,
    subcategory: FriendsSubcategory.OUTINGS,
    weekdayStart: 0,
    weekdayEnd: 6,
    startTime: '07:00',
    endTime: '23:59',
  },

  // FRIENDS - TRIPS/MULTI-DAY: 24/7 (all day)
  {
    category: BookingCategory.FRIENDS,
    subcategory: FriendsSubcategory.TRIPS_MULTI_DAY,
    weekdayStart: 0,
    weekdayEnd: 6,
    startTime: '00:00',
    endTime: '23:59',
  },

  // KID ACTIVITIES - Same as Friends
  {
    category: BookingCategory.KID_ACTIVITIES,
    subcategory: KidActivitiesSubcategory.COFFEE,
    weekdayStart: 1,
    weekdayEnd: 6,
    startTime: '07:00',
    endTime: '14:00',
    weekendStart: 0,
    weekendEnd: 0,
    weekendStartTime: '07:00',
    weekendEndTime: '14:00',
  },
  {
    category: BookingCategory.KID_ACTIVITIES,
    subcategory: KidActivitiesSubcategory.LUNCH,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '11:00',
    endTime: '14:00',
    weekendStart: 0,
    weekendEnd: 0,
    weekendStartTime: '11:00',
    weekendEndTime: '13:00',
  },
  {
    category: BookingCategory.KID_ACTIVITIES,
    subcategory: KidActivitiesSubcategory.DINNER,
    weekdayStart: 0,
    weekdayEnd: 6,
    startTime: '18:00',
    endTime: '23:59',
  },
  {
    category: BookingCategory.KID_ACTIVITIES,
    subcategory: KidActivitiesSubcategory.BRUNCH,
    weekdayStart: 1,
    weekdayEnd: 5,
    startTime: '09:30',
    endTime: '14:00',
    weekendStart: 0,
    weekendEnd: 0,
    weekendStartTime: '09:30',
    weekendEndTime: '13:00',
  },
  {
    category: BookingCategory.KID_ACTIVITIES,
    subcategory: KidActivitiesSubcategory.OUTINGS,
    weekdayStart: 0,
    weekdayEnd: 6,
    startTime: '07:00',
    endTime: '23:59',
  },
  {
    category: BookingCategory.KID_ACTIVITIES,
    subcategory: KidActivitiesSubcategory.TRIPS_MULTI_DAY,
    weekdayStart: 0,
    weekdayEnd: 6,
    startTime: '00:00',
    endTime: '23:59',
  },
];

/**
 * Available booking types (legacy, for backward compatibility)
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
 * Internal availability slot (used by availability engine)
 */
export interface AvailabilitySlot {
  start: Date;
  end: Date;
  available: boolean;
  reason?: string;
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
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  category: string;
  subcategory: string;
  startTime: string;
  endTime: string;
}

/**
 * Booking response from API
 */
export interface BookingResponse {
  success: boolean;
  message: string;
  eventId: string;
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

/**
 * Calendar event from Google Calendar API (used internally)
 */
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: Date;
  end: Date;
  busy: boolean;
  transparency?: string;
}
