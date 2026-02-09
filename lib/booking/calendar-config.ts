/**
 * Calendar Configuration
 *
 * Configuration for Google Calendar integration.
 * Maps calendar names to their IDs after initialization.
 */

/**
 * Calendar configuration
 */
export const CALENDAR_CONFIG = {
  calendars: [
    'My calendar',
    'Ranade Kolb Family',
    'Evie coparenting duty',
  ],
} as const;

/**
 * Calendar ID storage (initialized at runtime)
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
