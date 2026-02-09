import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  fetchEventsFromCalendars,
  initializeCalendarIds,
} from '@/lib/booking/calendar-service';
import {
  getAvailability,
  getAvailabilityByDay,
  filterByDuration,
} from '@/lib/booking/availability-engine';
import { BookingCategory, BookingSubcategory } from '@/lib/booking/types';

export async function GET(request: NextRequest) {
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

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') as BookingCategory;
    const subcategory = searchParams.get('subcategory') as BookingSubcategory;
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');
    const minDuration = searchParams.get('minDuration');
    const groupByDay = searchParams.get('groupByDay') === 'true';

    // Validate required parameters
    if (!category || !subcategory) {
      return NextResponse.json(
        { error: 'Category and subcategory are required' },
        { status: 400 }
      );
    }

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Start and end dates are required (ISO format)' },
        { status: 400 }
      );
    }

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use ISO format (e.g., 2024-01-15T10:00:00Z)' },
        { status: 400 }
      );
    }

    // Initialize calendar IDs and fetch events from Google Calendar
    await initializeCalendarIds(session.accessToken);
    const events = await fetchEventsFromCalendars(session.accessToken, start, end);

    // Get availability
    let availability;

    if (groupByDay) {
      const minDurationMinutes = minDuration ? parseInt(minDuration) : undefined;
      availability = getAvailabilityByDay(
        category,
        subcategory,
        start,
        end,
        events,
        minDurationMinutes
      );

      // Convert Map to object for JSON serialization
      // Format times as local time strings (YYYY-MM-DDTHH:mm:ss) without timezone
      const formatLocalDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      };

      const availabilityObj: Record<string, any[]> = {};
      for (const [day, slots] of availability.entries()) {
        availabilityObj[day] = slots.map((slot) => ({
          start: formatLocalDateTime(slot.start),
          end: formatLocalDateTime(slot.end),
          available: slot.available,
          reason: slot.reason,
        }));
      }

      return NextResponse.json({
        category,
        subcategory,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        availability: availabilityObj,
        totalEvents: events.length,
      });
    } else {
      const slots = getAvailability(category, subcategory, start, end, events);

      // Apply duration filter if specified
      let filteredSlots = slots;
      if (minDuration) {
        const minDurationMinutes = parseInt(minDuration);
        filteredSlots = filterByDuration(slots, minDurationMinutes);
      }

      // Format times as local time strings
      const formatLocalDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      };

      return NextResponse.json({
        category,
        subcategory,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        availability: filteredSlots.map((slot) => ({
          start: formatLocalDateTime(slot.start),
          end: formatLocalDateTime(slot.end),
          available: slot.available,
          reason: slot.reason,
        })),
        totalEvents: events.length,
      });
    }
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
