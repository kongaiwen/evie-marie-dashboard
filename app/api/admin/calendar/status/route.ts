import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  fetchEventsFromCalendars,
  initializeCalendarIds,
} from '@/lib/booking/calendar-service';
import { CALENDAR_CONFIG, getAllCalendarIds } from '@/lib/booking/calendar-config';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const hasAccessToken = !!session.accessToken;

    // Get events for the next 7 days
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    let events: any[] = [];
    let isConnected = false;
    let calendars: Array<{ name: string; id: string; found: boolean }> = [];

    if (hasAccessToken) {
      try {
        // Initialize calendar IDs
        await initializeCalendarIds(session.accessToken!);
        const calendarIds = getAllCalendarIds();

        // Build calendar status list
        calendars = CALENDAR_CONFIG.calendars.map((name) => ({
          name,
          id: calendarIds[name] || '',
          found: !!calendarIds[name],
        }));

        isConnected = Object.values(calendarIds).some((id) => id !== '');

        // Fetch events
        events = await fetchEventsFromCalendars(session.accessToken!, today, endDate);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
        isConnected = false;
      }
    }

    // Format events for the frontend
    const formattedEvents = events
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .map((event) => ({
        id: event.id,
        summary: event.summary,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
        busy: event.busy,
      }));

    // Count bookings (events with "coffee", "lunch", "brunch", etc. in summary)
    const bookingKeywords = ['coffee', 'lunch', 'brunch', 'dinner', 'outing', 'interview'];
    const upcomingBookings = formattedEvents.filter((event) =>
      bookingKeywords.some((keyword) =>
        event.summary.toLowerCase().includes(keyword)
      )
    ).length;

    return NextResponse.json({
      isConnected,
      hasAccessToken,
      calendars,
      events: formattedEvents,
      upcomingBookings,
      totalEvents: formattedEvents.length,
    });
  } catch (error) {
    console.error('Error in admin calendar status API:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch calendar status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
