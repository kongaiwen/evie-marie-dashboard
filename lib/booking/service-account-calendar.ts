/**
 * Service Account Calendar Service
 *
 * Uses a Google Service Account to access calendar data without user authentication.
 * For personal Gmail accounts, the calendars must be shared with the service account email.
 *
 * Setup:
 * 1. Create a service account in Google Cloud Console
 * 2. Download the JSON key file
 * 3. Share your calendars with the service account email (viewer access)
 * 4. Set the environment variables:
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *    - GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 */

import { google } from 'googleapis';
import { GoogleCalendarEvent } from './types';
import {
  CALENDAR_CONFIG,
  setCalendarId,
  getAllCalendarIds,
} from './calendar-config';

// Cache for calendar IDs (keyed by service account email for safety)
let serviceAccountCalendarIds: Record<string, string> = {};
let lastInitTime: number = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

/**
 * Check if service account is configured
 */
export function isServiceAccountConfigured(): boolean {
  return !!(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
}

/**
 * Create JWT auth client for the service account
 */
function getServiceAccountAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n'
  );

  if (!email || !privateKey) {
    throw new Error(
      'Service account not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.'
    );
  }

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
}

/**
 * Get Google Calendar client using service account
 */
export async function getServiceAccountCalendarClient() {
  const auth = getServiceAccountAuth();
  return google.calendar({ version: 'v3', auth });
}

/**
 * Initialize calendar IDs using service account
 *
 * Since service accounts for personal Gmail cannot list all calendars,
 * we need the calendars to be shared with the service account email.
 * The shared calendars will appear in the service account's calendar list.
 */
export async function initializeServiceAccountCalendarIds(): Promise<void> {
  // Check if cache is still valid
  if (
    Object.keys(serviceAccountCalendarIds).length > 0 &&
    Date.now() - lastInitTime < CACHE_TTL
  ) {
    return;
  }

  const calendar = await getServiceAccountCalendarClient();

  try {
    const response = await calendar.calendarList.list({
      maxResults: 250,
    });

    const calendars = response.data.items || [];

    console.log(
      '[ServiceAccount] Available calendars:',
      calendars.map((c) => `${c.summary} (${c.id})`).join(', ')
    );

    // Find and map the configured calendars
    for (const calendarName of CALENDAR_CONFIG.calendars) {
      const matchedCalendar = calendars.find((cal) => {
        const summary = (cal.summary || '').toLowerCase();
        const searchName = calendarName.toLowerCase();

        // Try exact match (case-insensitive)
        if (summary === searchName) {
          return true;
        }
        // Try partial match (case-insensitive)
        if (summary.includes(searchName)) {
          return true;
        }
        return false;
      });

      if (matchedCalendar?.id) {
        setCalendarId(calendarName, matchedCalendar.id);
        serviceAccountCalendarIds[calendarName] = matchedCalendar.id;
        console.log(
          `[ServiceAccount] Mapped calendar "${calendarName}" to ID: ${matchedCalendar.id}`
        );
      } else {
        console.warn(
          `[ServiceAccount] Could not find calendar "${calendarName}". ` +
            `Make sure it's shared with the service account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`
        );
      }
    }

    lastInitTime = Date.now();
  } catch (error) {
    console.error('[ServiceAccount] Error initializing calendar IDs:', error);
    throw error;
  }
}

/**
 * Fetch events from all configured calendars using service account
 */
export async function fetchEventsWithServiceAccount(
  startDate: Date,
  endDate: Date
): Promise<GoogleCalendarEvent[]> {
  // Ensure calendars are initialized
  await initializeServiceAccountCalendarIds();

  const calendar = await getServiceAccountCalendarClient();
  const eventsMap = new Map<string, GoogleCalendarEvent>();

  const calendarIds = getAllCalendarIds();
  const timeMin = startDate.toISOString();
  const timeMax = endDate.toISOString();

  // Fetch events from each calendar
  for (const [name, calendarId] of Object.entries(calendarIds)) {
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
          continue; // Skip all-day events
        }

        const eventId = event.id || `${calendarId}-${event.start.dateTime}`;

        // Use Map to deduplicate events by ID
        if (!eventsMap.has(eventId)) {
          eventsMap.set(eventId, {
            id: eventId,
            summary: event.summary || 'No title',
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
            busy: event.transparency !== 'transparent',
            transparency: event.transparency || undefined,
          });
        }
      }
    } catch (error) {
      console.error(
        `[ServiceAccount] Error fetching events from calendar "${name}":`,
        error
      );
      // Continue with other calendars even if one fails
    }
  }

  console.log(
    `[ServiceAccount] Fetched ${eventsMap.size} events from ${timeMin} to ${timeMax}`
  );

  return Array.from(eventsMap.values());
}
