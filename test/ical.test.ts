// test/icalSyntax.test.ts

import { describe, it, expect } from 'vitest';
import { icalFixtures } from './rfcFixtures';

describe('iCalendar Syntax Tests', () => {
  it('Valid iCalendar data should match the syntax', () => {
    icalFixtures.valid.forEach((fixture) => {
      expect(fixture).toMatch(/BEGIN:VCALENDAR/);
      expect(fixture).toMatch(/END:VCALENDAR/);
      expect(fixture).toMatch(/BEGIN:VEVENT/);
      expect(fixture).toMatch(/END:VEVENT/);
      expect(fixture).toMatch(/VERSION:2\.0/);
      expect(fixture).toMatch(/PRODID:/);
      expect(fixture).toMatch(/UID:/);
      expect(fixture).toMatch(/DTSTAMP:/);
      expect(fixture).toMatch(/DTSTART:/);
      expect(fixture).toMatch(/DTEND:/);
      expect(fixture).toMatch(/SUMMARY:/);
      expect(fixture).toMatch(/DESCRIPTION:/);
      expect(fixture).toMatch(/LOCATION:/);
      expect(fixture).toMatch(/CALSCALE:/);
      expect(fixture).toMatch(/METHOD:/);
      expect(fixture).toMatch(/ATTACH:/);
      expect(fixture).toMatch(/CATEGORIES:/);
      expect(fixture).toMatch(/CLASS:/);
      expect(fixture).toMatch(/COMMENT:/);
      expect(fixture).toMatch(/RRULE:/);
      expect(fixture).toMatch(/EXDATE:/);
      expect(fixture).toMatch(/X-CUSTOM-PROPERTY:/);
      expect(fixture).toMatch(/ATTENDEE:/);
      expect(fixture).toMatch(/ORGANIZER:/);
      expect(fixture).toMatch(/TZID:/);
      expect(fixture).toMatch(/FREEBUSY:/);
      expect(fixture).toMatch(/TRANSP:/);
      expect(fixture).toMatch(/SEQUENCE:/);
      expect(fixture).toMatch(/STATUS:/);
      expect(fixture).toMatch(/TRUE|FALSE/);
    });
  });

  it('Invalid iCalendar data should not match the syntax', () => {
    icalFixtures.invalid.forEach((fixture) => {
      expect(fixture).toMatch(/BEGIN:VCALENDAR/);
      expect(fixture).toMatch(/END:VCALENDAR/);
      expect(fixture).toMatch(/BEGIN:VEVENT/);
      expect(fixture).not.toMatch(/END:VEVENT/); // This is the error we expect
      expect(fixture).toMatch(/VERSION:2\.0/);
      expect(fixture).toMatch(/PRODID:/);
      expect(fixture).toMatch(/UID:/);
      expect(fixture).toMatch(/DTSTAMP:/);
      expect(fixture).toMatch(/DTSTART:/);
      expect(fixture).toMatch(/DTEND:/);
      expect(fixture).toMatch(/SUMMARY:/);
      expect(fixture).toMatch(/DESCRIPTION:/);
      expect(fixture).toMatch(/LOCATION:/);
      expect(fixture).toMatch(/CALSCALE:/);
      expect(fixture).toMatch(/METHOD:/);
      expect(fixture).toMatch(/ATTACH:/);
      expect(fixture).toMatch(/CATEGORIES:/);
      expect(fixture).toMatch(/CLASS:/);
      expect(fixture).toMatch(/COMMENT:/);
      expect(fixture).toMatch(/RRULE:/);
      expect(fixture).toMatch(/EXDATE:/);
      expect(fixture).toMatch(/X-CUSTOM-PROPERTY:/);
      expect(fixture).toMatch(/ATTENDEE:/);
      expect(fixture).toMatch(/ORGANIZER:/);
      expect(fixture).toMatch(/TZID:/);
      expect(fixture).toMatch(/FREEBUSY:/);
      expect(fixture).toMatch(/TRANSP:/);
      expect(fixture).toMatch(/SEQUENCE:/);
      expect(fixture).toMatch(/STATUS:/);
      expect(fixture).toMatch(/TRUE|FALSE/);
    });
  });
});