# Booking System Integration Layer

## Overview

This integration layer provides a complete frontend-backend connection for the booking system. It includes TypeScript types, API clients, React hooks, and calendar utilities that Agent 2 can use to build the booking UI.

## Architecture

```
lib/booking/
├── types.ts              # TypeScript types and interfaces
├── api-client.ts         # API client functions
├── calendar-utils.ts     # Calendar integration utilities
├── hooks.ts              # React hooks for state management
└── index.ts              # Main entry point (exports everything)
```

## Features

- **Type-safe API communication** with full TypeScript support
- **React hooks** for managing booking state
- **Calendar integration** (Google, Outlook, Apple, Yahoo, .ics)
- **Error handling** with custom error types
- **Form validation** with detailed error messages
- **Loading states** with retry logic
- **Debouncing** for search/filter operations

## Quick Start

### 1. Import the Booking Hooks

```typescript
import {
  useAvailability,
  useBookingForm,
  useCalendarIntegration
} from '@/lib/booking';
```

### 2. Fetch Availability

```typescript
const { availability, isLoading, error, refetch } = useAvailability({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  bookingType: 'discovery'
});
```

### 3. Handle Form Submission

```typescript
const { isSubmitting, confirmation, validationErrors, submit } = useBookingForm();

const handleSubmit = async (formData) => {
  const bookingRequest: BookingRequest = {
    contactInfo: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    },
    bookingDetails: {
      bookingType: 'discovery',
      slotId: selectedSlot.id,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    agenda: {
      topics: formData.topics,
      additionalNotes: formData.notes,
    },
  };

  const result = await submit(bookingRequest);

  if (result.success) {
    // Show confirmation
  }
};
```

### 4. Calendar Integration

```typescript
const { addToGoogle, addToOutlook, addToApple, downloadICS } =
  useCalendarIntegration(confirmation);

// In your JSX:
<button onClick={addToGoogle}>Add to Google Calendar</button>
<button onClick={addToOutlook}>Add to Outlook</button>
<button onClick={downloadICS}>Download .ics File</button>
```

## API Reference

### Types

#### BookingType
```typescript
type BookingType = 'discovery' | 'consultation' | 'presentation';
```

#### SlotStatus
```typescript
type SlotStatus = 'available' | 'booked' | 'unavailable' | 'past';
```

#### TimeSlot
```typescript
interface TimeSlot {
  id: string;
  startTime: string;  // ISO 8601 format
  endTime: string;    // ISO 8601 format
  status: SlotStatus;
  bookingType?: BookingType;
}
```

#### DayAvailability
```typescript
interface DayAvailability {
  date: string;  // YYYY-MM-DD format
  slots: TimeSlot[];
}
```

#### BookingRequest
```typescript
interface BookingRequest {
  contactInfo: ContactInfo;
  bookingDetails: BookingDetails;
  agenda?: MeetingAgenda;
}
```

#### BookingConfirmation
```typescript
interface BookingConfirmation {
  bookingId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDetails: BookingDetails;
  contactInfo: ContactInfo;
  calendarLinks: CalendarLinks;
  createdAt: string;
  updatedAt: string;
}
```

### Hooks

#### useAvailability(query)

Fetches availability slots for a date range.

**Parameters:**
- `query: AvailabilityQuery`
  - `startDate: string` - Start date (YYYY-MM-DD)
  - `endDate: string` - End date (YYYY-MM-DD)
  - `bookingType?: BookingType` - Optional booking type filter

**Returns:**
- `availability: DayAvailability[]` - Array of available slots
- `isLoading: boolean` - Loading state
- `error: string | null` - Error message
- `refetch: () => void` - Refetch function

#### useBookingForm()

Manages booking form state and submission.

**Returns:**
- `isSubmitting: boolean` - Submission state
- `error: string | null` - Error message
- `confirmation: BookingConfirmation | null` - Confirmation data
- `validationErrors: BookingFormErrors` - Form validation errors
- `submit: (booking: BookingRequest) => Promise<Result>` - Submit function
- `reset: () => void` - Reset form state

#### useCalendarIntegration(confirmation)

Provides calendar integration functions.

**Parameters:**
- `confirmation: BookingConfirmation | null` - Booking confirmation data

**Returns:**
- `calendarLinks: CalendarLinks` - All calendar links
- `addToGoogle: () => void` - Open Google Calendar
- `addToOutlook: () => void` - Open Outlook Calendar
- `addToApple: () => void` - Open Apple Calendar
- `downloadICS: () => void` - Download .ics file

#### useAsyncState()

Manages loading and error states with retry logic.

**Returns:**
- `isLoading: boolean` - Loading state
- `error: string | null` - Error message
- `retryCount: number` - Number of retry attempts
- `execute: (fn, maxRetries) => Promise<T>` - Execute async function
- `reset: () => void` - Reset state

### API Client Functions

#### fetchAvailability(query)

Fetches availability from the backend API.

```typescript
const availability = await fetchAvailability({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  bookingType: 'discovery'
});
```

#### submitBooking(booking)

Submits a booking request to the backend API.

```typescript
const confirmation = await submitBooking(bookingRequest);
```

#### validateBooking(booking)

Validates booking data before submission.

```typescript
const { isValid, errors } = validateBooking(bookingRequest);
```

### Calendar Utilities

#### generateCalendarLinks(event)

Generates all calendar links for an event.

```typescript
const links = generateCalendarLinks(calendarEvent);
// Returns: { google, outlook, apple, yahoo, icsDownload }
```

#### downloadICS(event, filename)

Downloads an .ics file to the user's device.

```typescript
downloadICS(calendarEvent, 'my-event.ics');
```

## Error Handling

All API functions throw `BookingApiError` with detailed error information:

```typescript
try {
  await submitBooking(bookingRequest);
} catch (error) {
  if (error instanceof BookingApiError) {
    console.error(error.code);      // Error code
    console.error(error.message);   // Human-readable message
    console.error(error.details);   // Additional details
  }
}
```

### Error Codes

- `SLOT_UNAVAILABLE` - Selected slot is no longer available
- `INVALID_DATE_RANGE` - Date range is invalid
- `INVALID_EMAIL` - Email format is invalid
- `SLOT_ALREADY_BOOKED` - Slot has already been booked
- `SERVER_ERROR` - Server-side error occurred
- `VALIDATION_ERROR` - Form validation failed

## Backend API Endpoints

This integration layer expects the following API endpoints to be implemented by Agent 1:

### GET /api/booking/availability

Query parameters:
- `startDate` (required) - Start date in YYYY-MM-DD format
- `endDate` (required) - End date in YYYY-MM-DD format
- `bookingType` (optional) - Filter by booking type

Response:
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-01-01",
      "slots": [
        {
          "id": "slot-123",
          "startTime": "2024-01-01T10:00:00Z",
          "endTime": "2024-01-01T10:30:00Z",
          "status": "available"
        }
      ]
    }
  ]
}
```

### POST /api/booking/create

Request body:
```json
{
  "contactInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "bookingDetails": {
    "bookingType": "discovery",
    "slotId": "slot-123",
    "startTime": "2024-01-01T10:00:00Z",
    "endTime": "2024-01-01T10:30:00Z",
    "timezone": "America/Los_Angeles"
  },
  "agenda": {
    "topics": ["AI Engineering", "Data Engineering"],
    "additionalNotes": "Discuss collaboration opportunities"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "bookingId": "booking-123",
    "status": "confirmed",
    "bookingDetails": { ... },
    "contactInfo": { ... },
    "calendarLinks": { ... },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

## Example Component

See `components/Booking/BookingExample.tsx` for a complete working example that demonstrates:

1. Fetching availability data
2. Displaying loading and error states
3. Building a booking form
4. Handling form validation
5. Submitting bookings
6. Displaying confirmation with calendar links

## Dependencies

This integration layer requires:

- React 18+
- TypeScript 5+
- Next.js 14+ (for API routes)
- No external libraries for API calls (uses native fetch)

## Environment Variables

Optional environment variable:

```bash
NEXT_PUBLIC_API_URL=/api  # Default: /api
```

## Testing

To test the integration layer:

1. Mock the API responses using MSW or similar
2. Test React hooks with @testing-library/react-hooks
3. Test error handling scenarios
4. Test calendar link generation

## Coordination Notes

### Agent 1 (Backend)
- Must implement API endpoints matching the specifications above
- Should return data in the exact format specified in types
- Must handle error responses with proper error codes

### Agent 2 (Frontend)
- Should use the hooks provided in this integration layer
- Should handle loading states using the `isLoading` flags
- Should display errors using the `error` messages
- Should implement the calendar buttons using the provided utilities

### Agent 4 (Integration - Me)
- Created the integration layer
- Provided types, hooks, and utilities
- Created example component for reference
- Ready to assist with any integration issues

## Commit History

- **Commit 1**: Created TypeScript types for booking data structures
- **Commit 2**: Created API client with fetch, submit, cancel, reschedule functions
- **Commit 3**: Created calendar integration utilities (Google, Outlook, Apple, .ics)
- **Commit 4**: Created React hooks for booking state management
- **Commit 5**: Created example component and documentation

## Next Steps

1. Wait for Agent 1 to implement backend API endpoints
2. Wait for Agent 2 to create frontend booking UI components
3. Test the integration end-to-end
4. Handle any edge cases or errors that arise
5. Optimize performance if needed

## Support

If you encounter any issues with the integration layer, please check:

1. API endpoints are returning data in the correct format
2. TypeScript types match your data structures
3. Error handling is properly implemented
4. Calendar links are working as expected

For questions or issues, contact Agent 4 (Integration).
