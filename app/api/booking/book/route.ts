import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  fetchEventsFromCalendars,
  initializeCalendarIds,
  createEvent,
} from '@/lib/booking/calendar-service';
import { BookingRequest, BookingResponse } from '@/lib/booking/types';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!session.accessToken) {
      return NextResponse.json(
        { error: 'Google Calendar access token not found. Please re-authenticate.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: BookingRequest = await request.json();

    const {
      name,
      email,
      phone,
      notes,
      category,
      subcategory,
      startTime,
      endTime,
    } = body;

    // Validate required fields
    if (!name || !email || !category || !subcategory || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, category, subcategory, startTime, endTime' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Parse dates
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use ISO format (e.g., 2024-01-15T10:00:00Z)' },
        { status: 400 }
      );
    }

    // Validate end time is after start time
    if (end <= start) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      );
    }

    // Initialize calendar IDs and check for conflicts
    await initializeCalendarIds(session.accessToken);
    const events = await fetchEventsFromCalendars(session.accessToken, start, end);

    // Check for conflicts with busy events
    const conflictingEvent = events.find((event) => {
      return (
        event.busy &&
        ((start >= event.start && start < event.end) ||
          (end > event.start && end <= event.end) ||
          (start <= event.start && end >= event.end))
      );
    });

    if (conflictingEvent) {
      return NextResponse.json(
        {
          error: 'Time slot is not available',
          conflict: {
            summary: conflictingEvent.summary,
            start: conflictingEvent.start.toISOString(),
            end: conflictingEvent.end.toISOString(),
          },
        },
        { status: 409 }
      );
    }

    // Build event description
    const descriptionParts = [
      `Category: ${category}`,
      `Subcategory: ${subcategory}`,
      `Contact: ${name} (${email})`,
    ];

    if (phone) {
      descriptionParts.push(`Phone: ${phone}`);
    }

    if (notes) {
      descriptionParts.push(`\nNotes: ${notes}`);
    }

    const description = descriptionParts.join('\n');

    // Create the event on Google Calendar
    const eventId = await createEvent(
      session.accessToken,
      `${subcategory} - ${name}`,
      start,
      end,
      description,
      [email]
    );

    const response: BookingResponse = {
      success: true,
      message: 'Booking created successfully',
      eventId,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        error: 'Failed to create booking',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
