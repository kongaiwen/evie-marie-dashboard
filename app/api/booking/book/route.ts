import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/../../auth';
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

    // Get access token from session
    const account = session.accounts?.[0];
    if (!account?.access_token) {
      return NextResponse.json(
        { error: 'No access token available. Please re-authenticate.' },
        { status: 401 }
      );
    }

    // Initialize calendar IDs and check for conflicts
    await initializeCalendarIds(account.access_token);
    const events = await fetchEventsFromCalendars(account.access_token, start, end);

    // Check for conflicts
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

    // Create the event
    const eventId = await createEvent(
      account.access_token,
      `${subcategory} - ${name}`,
      start,
      end,
      description,
      [email] // Add the requester's email as an attendee
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
