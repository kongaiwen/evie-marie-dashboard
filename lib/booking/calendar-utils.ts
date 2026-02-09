/**
 * Calendar Integration Utilities
 *
 * This file contains utilities for generating calendar links and .ics files
 * for "Add to Calendar" functionality across multiple calendar platforms.
 */

import { CalendarEvent, CalendarLinks } from './types';

/**
 * Format date for Google Calendar URL format
 * Format: YYYYMMDDTHHmmSSZ
 */
function formatForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Format date for ICS file format
 */
function formatForICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * URL encode a string for use in query parameters
 */
function encodeParam(str: string): string {
  return encodeURIComponent(str).replace(/%20/g, '+');
}

/**
 * Generate Google Calendar link
 *
 * @param event - Calendar event data
 * @returns Google Calendar URL
 */
export function generateGoogleCalendarLink(event: CalendarEvent): string {
  const startDate = formatForGoogle(new Date(event.startTime));
  const endDate = formatForGoogle(new Date(event.endTime));

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDate}/${endDate}`,
    details: event.description,
    ...(event.location && { location: event.location }),
    // Add attendees
    ...(event.attendees.length > 0 && {
      add: event.attendees.map(a => a.email).join(',')
    }),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate Outlook Calendar link
 *
 * @param event - Calendar event data
 * @returns Outlook Calendar URL
 */
export function generateOutlookCalendarLink(event: CalendarEvent): string {
  const startDate = formatForGoogle(new Date(event.startTime));
  const endDate = formatForGoogle(new Date(event.endTime));

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    startdt: startDate,
    enddt: endDate,
    subject: event.title,
    body: event.description,
    ...(event.location && { location: event.location }),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generate Yahoo Calendar link
 *
 * @param event - Calendar event data
 * @returns Yahoo Calendar URL
 */
export function generateYahooCalendarLink(event: CalendarEvent): string {
  const startDate = formatForGoogle(new Date(event.startTime));
  const endDate = formatForGoogle(new Date(event.endTime));

  const params = new URLSearchParams({
    title: event.title,
    st: startDate,
    et: endDate,
    desc: event.description,
    ...(event.location && { in_loc: event.location }),
  });

  return `https://calendar.yahoo.com/?${params.toString()}`;
}

/**
 * Generate Apple Calendar link (using webcal:// protocol for direct subscription)
 * Note: This generates a data URL that can be downloaded as .ics
 *
 * @param event - Calendar event data
 * @returns data URL for .ics file
 */
export function generateAppleCalendarLink(event: CalendarEvent): string {
  const icsContent = generateICSContent(event);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}

/**
 * Generate ICS file content
 *
 * @param event - Calendar event data
 * @returns ICS file content as string
 */
export function generateICSContent(event: CalendarEvent): string {
  const startDate = formatForICS(new Date(event.startTime));
  const endDate = formatForICS(new Date(event.endTime));
  const now = formatForICS(new Date());
  const uid = `${Date.now()}-booking@eviemarie.dev`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Evie Marie Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `DTSTAMP:${now}`,
    `UID:${uid}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    ...(event.location ? [`LOCATION:${event.location}`] : []),
    ...(event.attendees.length > 0
      ? event.attendees.map(a => `ATTENDEE:mailto:${a.email}`)
      : []
    ),
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Download ICS file to user's device
 *
 * @param event - Calendar event data
 * @param filename - Optional filename (defaults to 'event.ics')
 */
export function downloadICS(event: CalendarEvent, filename = 'event.ics'): void {
  const icsContent = generateICSContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate all calendar links for an event
 *
 * @param event - Calendar event data
 * @returns Object with all calendar platform links
 */
export function generateCalendarLinks(event: CalendarEvent): CalendarLinks {
  return {
    google: generateGoogleCalendarLink(event),
    outlook: generateOutlookCalendarLink(event),
    apple: generateAppleCalendarLink(event),
    yahoo: generateYahooCalendarLink(event),
    icsDownload: '', // This is handled by the downloadICS function
  };
}

/**
 * Open a calendar link in a new tab
 *
 * @param url - Calendar URL to open
 */
export function openCalendarLink(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Convert booking confirmation to calendar event
 *
 * @param confirmation - Booking confirmation data
 * @returns Calendar event object
 */
export function bookingToCalendarEvent(confirmation: {
  bookingDetails: {
    startTime: string;
    endTime: string;
  };
  contactInfo: {
    email: string;
    firstName: string;
    lastName: string;
  };
}): CalendarEvent {
  const { bookingDetails, contactInfo } = confirmation;
  const fullName = `${contactInfo.firstName} ${contactInfo.lastName}`;

  return {
    title: 'Discovery Call with Evie Marie Kolb',
    description: `Booking confirmed with ${fullName}\n\nTime: ${new Date(bookingDetails.startTime).toLocaleString()}`,
    location: 'Online (Zoom link will be sent via email)',
    startTime: bookingDetails.startTime,
    endTime: bookingDetails.endTime,
    attendees: [
      {
        email: contactInfo.email,
        name: fullName,
      },
      {
        email: 'evie@eviemarie.dev',
        name: 'Evie Marie Kolb',
      },
    ],
  };
}
