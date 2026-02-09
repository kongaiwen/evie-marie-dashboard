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

  const { isSubmitting, confirmation, submit } = useBookingForm();

  const { addToGoogle, addToOutlook, downloadICS } = useCalendarIntegration(confirmation);

  // Handle form submission
  const handleSubmit = async (formData: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  }) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    const bookingRequest = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
      category: 'professional',
      subcategory: 'job_interview',
      startTime: selectedDate,
      endTime: selectedDate,
    };

    await submit(bookingRequest);
  };

  return (
    <div className={styles.bookingExample}>
      <h1>Booking Example</h1>
      <p>This component demonstrates the booking hooks usage.</p>

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
          <h2>Available Time Slots</h2>
          <p>{availability.length} slots available</p>
        </div>
      )}

      {/* Confirmation with Calendar Links */}
      {confirmation && (
        <div className={styles.confirmation}>
          <h2>Booking Confirmed!</h2>
          <p>Your booking has been confirmed.</p>

          <div className={styles.calendarLinks}>
            <button onClick={addToGoogle}>Add to Google Calendar</button>
            <button onClick={addToOutlook}>Add to Outlook</button>
            <button onClick={downloadICS}>Download .ics</button>
          </div>
        </div>
      )}
    </div>
  );
}
