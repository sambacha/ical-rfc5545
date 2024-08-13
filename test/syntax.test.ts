// test/icalSyntax.test.ts

import { describe, it, expect } from 'vitest';
import { icalFixtures } from './icalFixtures';

describe('iCalendar Syntax Tests', () => {
  it('Valid iCalendar data should match the syntax', () => {
    // biome-ignore lint/complexity/noForEach: <explanation>
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
    });
  });

  it('Invalid iCalendar data should not match the syntax', () => {
    // biome-ignore lint/complexity/noForEach: <explanation>
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
    });
  });
});