/**
 * Calendar Configuration
 *
 * Configuration for Google Calendar integration.
 * Calendar IDs are read from environment variables for service account access.
 *
 * Required environment variables:
 * - GOOGLE_CALENDAR_ID_MY_CALENDAR - Your primary calendar (usually your-email@gmail.com)
 * - GOOGLE_CALENDAR_ID_FAMILY - Family shared calendar
 * - GOOGLE_CALENDAR_ID_COPARENTING - Coparenting duty calendar
 */

/**
 * Calendar configuration with their environment variable names
 */
export const CALENDAR_CONFIG = {
  calendars: [
    { name: 'My calendar', envVar: 'GOOGLE_CALENDAR_ID_MY_CALENDAR' },
    { name: 'Ranade Kolb Family', envVar: 'GOOGLE_CALENDAR_ID_FAMILY' },
    { name: 'Evie Coparenting Duty', envVar: 'GOOGLE_CALENDAR_ID_COPARENTING' },
  ],
} as const;

/**
 * Get calendar ID from environment variable by name
 */
function getCalendarIdFromEnv(calendarName: string): string | undefined {
  const config = CALENDAR_CONFIG.calendars.find((c) => c.name === calendarName);
  if (!config) return undefined;
  return process.env[config.envVar];
}

/**
 * Calendar ID storage (initialized from environment variables)
 */
const calendarIds: Record<string, string> = {};

/**
 * Set a calendar ID for a given calendar name
 */
export function setCalendarId(calendarName: string, id: string): void {
  calendarIds[calendarName] = id;
}

/**
 * Get a calendar ID for a given calendar name
 */
export function getCalendarId(calendarName: string): string | undefined {
  return calendarIds[calendarName];
}

/**
 * Get all initialized calendar IDs
 */
export function getAllCalendarIds(): Record<string, string> {
  return { ...calendarIds };
}

/**
 * Export the calendar IDs for use in calendar-service.ts
 */
export const CALENDAR_IDS = calendarIds;
