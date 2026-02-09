import { google } from 'googleapis';
import { GoogleCalendarEvent } from './types';
import {
  CALENDAR_CONFIG,
  setCalendarId,
  getAllCalendarIds,
} from './calendar-config';

// Local reference to calendar IDs (updated after initialization)
let cachedCalendarIds: Record<string, string> = {};

// Initialize Google Calendar API client
export async function getCalendarClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

// Initialize calendar IDs by listing all calendars and finding the configured ones
export async function initializeCalendarIds(accessToken: string): Promise<void> {
  const calendar = await getCalendarClient(accessToken);

  try {
    const response = await calendar.calendarList.list({
      maxResults: 250,
    });

    const calendars = response.data.items || [];

    // Find and map the configured calendars
    for (const calendarName of CALENDAR_CONFIG.calendars) {
      const matchedCalendar = calendars.find((cal) => {
        // Try to match by summary (display name)
        if (cal.summary === calendarName || cal.summary?.includes(calendarName)) {
          return true;
        }
        // Special case for "My calendar" - match primary calendar or calendar by account email
        if (calendarName === 'My calendar') {
          return cal.primary === true || cal.id === cal.summary;
        }
        return false;
      });

      if (matchedCalendar?.id) {
        setCalendarId(calendarName, matchedCalendar.id);
        console.log(`Mapped calendar "${calendarName}" to ID: ${matchedCalendar.id} (${matchedCalendar.summary})`);
      } else {
        console.warn(`Could not find calendar ID for "${calendarName}"`);
      }
    }

    // Update the cache
    cachedCalendarIds = getAllCalendarIds();
  } catch (error) {
    console.error('Error initializing calendar IDs:', error);
    throw error;
  }
}

// Fetch events from all configured calendars within a date range
export async function fetchEventsFromCalendars(
  accessToken: string,
  startDate: Date,
  endDate: Date
): Promise<GoogleCalendarEvent[]> {
  const calendar = await getCalendarClient(accessToken);
  const allEvents: GoogleCalendarEvent[] = [];

  // Refresh calendar IDs cache
  cachedCalendarIds = getAllCalendarIds();

  // Check if we need to initialize
  const calendarIdValues = Object.values(cachedCalendarIds);
  if (calendarIdValues.length === 0) {
    await initializeCalendarIds(accessToken);
    cachedCalendarIds = getAllCalendarIds();
  }

  const timeMin = startDate.toISOString();
  const timeMax = endDate.toISOString();

  // Fetch events from each calendar
  for (const [name, calendarId] of Object.entries(cachedCalendarIds)) {
    try {
      const response = await calendar.events.list({
        calendarId,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items || [];

      for (const event of events) {
        if (!event.start?.dateTime || !event.end?.dateTime) {
          continue; // Skip all-day events for now
        }

        allEvents.push({
          id: event.id || '',
          summary: event.summary || 'No title',
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          busy: event.transparency !== 'transparent', // Default to busy unless marked transparent
          transparency: event.transparency || undefined,
        });
      }
    } catch (error) {
      console.error(`Error fetching events from calendar "${name}":`, error);
      // Continue with other calendars even if one fails
    }
  }

  return allEvents;
}

// Create a new event on the primary calendar
export async function createEvent(
  accessToken: string,
  summary: string,
  startTime: Date,
  endTime: Date,
  description?: string,
  attendees?: string[]
): Promise<string> {
  const calendar = await getCalendarClient(accessToken);

  const event = {
    summary,
    description,
    start: {
      dateTime: startTime.toISOString(),
    },
    end: {
      dateTime: endTime.toISOString(),
    },
    attendees: attendees?.map((email) => ({ email })),
    transparency: 'opaque', // Mark as busy
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary', // Use the authenticated user's primary calendar
      requestBody: event,
    });

    if (response.data.id) {
      return response.data.id;
    }

    throw new Error('Failed to create event: No ID returned');
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

// Update an existing event
export async function updateEvent(
  accessToken: string,
  eventId: string,
  summary?: string,
  startTime?: Date,
  endTime?: Date,
  description?: string
): Promise<void> {
  const calendar = await getCalendarClient(accessToken);

  const event: any = {};

  if (summary) event.summary = summary;
  if (startTime) event.start = { dateTime: startTime.toISOString() };
  if (endTime) event.end = { dateTime: endTime.toISOString() };
  if (description) event.description = description;

  try {
    await calendar.events.update({
      calendarId: 'primary',
      eventId,
      requestBody: event,
    });
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

// Delete an event
export async function deleteEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  const calendar = await getCalendarClient(accessToken);

  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}
