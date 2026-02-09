/**
 * Example Booking Component
 *
 * This component demonstrates how to use the booking integration layer
 * to connect the frontend UI with the backend API.
 *
 * This is a reference implementation for Agent 2 to use when building
 * the actual booking page components.
 */

'use client';

import React, { useState } from 'react';
import {
  useAvailability,
  useBookingForm,
  useCalendarIntegration,
  BookingRequest,
  BookingType,
} from '@/lib/booking';
import styles from './BookingExample.module.scss';

/**
 * Example: How to use the booking hooks in a component
 */
export default function BookingExample() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Fetch availability for the next 30 days
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 30);

  const { availability, isLoading, error } = useAvailability({
    startDate: today.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    bookingType: 'discovery',
  });

  const { isSubmitting, confirmation, validationErrors, submit, reset } = useBookingForm();

  const { addToGoogle, addToOutlook, downloadICS } = useCalendarIntegration(confirmation);

  // Handle form submission
  const handleSubmit = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    topics: string[];
  }) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    const bookingRequest: BookingRequest = {
      contactInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      bookingDetails: {
        bookingType: 'discovery',
        slotId: selectedTime,
        startTime: selectedDate, // In reality, this would come from the slot data
        endTime: selectedDate,   // In reality, this would come from the slot data
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      agenda: {
        topics: formData.topics,
      },
    };

    await submit(bookingRequest);
  };

  return (
    <div className={styles.bookingExample}>
      <h1>Booking Example</h1>

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loading}>
          <p>Loading availability...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles.error}>
          <p>Error: {error}</p>
        </div>
      )}

      {/* Availability Display */}
      {!isLoading && !error && availability.length > 0 && (
        <div className={styles.availability}>
          <h2>Available Slots</h2>
          {availability.map(day => (
            <div key={day.date} className={styles.day}>
              <h3>{new Date(day.date).toLocaleDateString()}</h3>
              <div className={styles.slots}>
                {day.slots.map(slot => (
                  <button
                    key={slot.id}
                    className={styles.slot}
                    disabled={slot.status !== 'available'}
                    onClick={() => setSelectedTime(slot.id)}
                  >
                    {new Date(slot.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form */}
      {selectedTime && !confirmation && (
        <form className={styles.form} onSubmit={(e) => {
          e.preventDefault();
          // In a real component, you'd extract form data here
          const formData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            topics: ['AI Engineering'],
          };
          handleSubmit(formData);
        }}>
          <h2>Book Your Slot</h2>

          {/* Form fields would go here */}
          <input
            type="text"
            placeholder="First Name"
            className={validationErrors.firstName ? styles.error : ''}
          />
          {validationErrors.firstName && (
            <span className={styles.errorMessage}>{validationErrors.firstName}</span>
          )}

          <input
            type="text"
            placeholder="Last Name"
            className={validationErrors.lastName ? styles.error : ''}
          />
          {validationErrors.lastName && (
            <span className={styles.errorMessage}>{validationErrors.lastName}</span>
          )}

          <input
            type="email"
            placeholder="Email"
            className={validationErrors.email ? styles.error : ''}
          />
          {validationErrors.email && (
            <span className={styles.errorMessage}>{validationErrors.email}</span>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>
      )}

      {/* Confirmation & Calendar Integration */}
      {confirmation && (
        <div className={styles.confirmation}>
          <h2>Booking Confirmed!</h2>
          <p>Your booking ID is: {confirmation.bookingId}</p>
          <p>
            {new Date(confirmation.bookingDetails.startTime).toLocaleString()}
          </p>

          <div className={styles.calendarButtons}>
            <button onClick={addToGoogle} className={styles.google}>
              Add to Google Calendar
            </button>
            <button onClick={addToOutlook} className={styles.outlook}>
              Add to Outlook
            </button>
            <button onClick={downloadICS} className={styles.ics}>
              Download .ics File
            </button>
          </div>

          <button onClick={reset} className={styles.newBooking}>
            Book Another Slot
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * USAGE EXAMPLE FOR AGENT 2:
 *
 * 1. Import the hooks:
 *    import { useAvailability, useBookingForm, useCalendarIntegration } from '@/lib/booking';
 *
 * 2. Use useAvailability to fetch available time slots:
 *    const { availability, isLoading, error } = useAvailability({
 *      startDate: '2024-01-01',
 *      endDate: '2024-01-31',
 *      bookingType: 'discovery',
 *    });
 *
 * 3. Use useBookingForm to handle form submission:
 *    const { isSubmitting, confirmation, submit } = useBookingForm();
 *
 * 4. Use useCalendarIntegration for "Add to Calendar" buttons:
 *    const { addToGoogle, addToOutlook, downloadICS } = useCalendarIntegration(confirmation);
 *
 * 5. Display loading states:
 *    {isLoading && <LoadingSpinner />}
 *
 * 6. Display error states:
 *    {error && <ErrorMessage message={error} />}
 *
 * 7. Display availability data:
 *    {availability.map(day => <DayCalendar key={day.date} slots={day.slots} />)}
 *
 * 8. Handle form submission:
 *    const handleSubmit = async (formData) => {
 *      const result = await submit(bookingRequest);
 *      if (result.success) {
 *        // Show confirmation
 *      }
 *    };
 */
