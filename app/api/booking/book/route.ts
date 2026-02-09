import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
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

    // TODO: Integrate with Google Calendar when auth is properly configured
    // For now, generate a mock booking ID
    const eventId = `booking_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const response: BookingResponse = {
      success: true,
      message: 'Booking created successfully (mock - Google Calendar integration pending)',
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
