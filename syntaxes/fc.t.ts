const assert = require('node:assert');
const { test, fc } = require('@fast-check/jest');

describe('iCalendar Syntax Tests', () => {
  test.prop('BEGIN and END statements are properly formatted', [
    fc.constantFrom('VCALENDAR', 'VEVENT', 'VTODO', 'VJOURNAL', 'VFREEBUSY', 'VTIMEZONE', 'VALARM')
  ])((component) => {
    const begin = `BEGIN:${component}`;
    const end = `END:${component}`;
    expect(begin).toMatch(/^BEGIN:[A-Z]+$/);
    expect(end).toMatch(/^END:[A-Z]+$/);
  });

  test.prop('Date-time values are in correct format', [
    fc.date()
  ])((date) => {
    const formatted = `${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
    expect(formatted).toMatch(/^[0-9]{8}T[0-9]{6}Z$/);
  });

  test.prop('Property names are uppercase', [
    fc.constantFrom('SUMMARY', 'DESCRIPTION', 'LOCATION', 'DTSTART', 'DTEND', 'DURATION')
  ])((prop) => {
    expect(prop).toMatch(/^[A-Z-]+$/);
  });

  test.prop('Boolean values are TRUE or FALSE', [
    fc.boolean()
  ])((bool) => {
    const icalBool = bool ? 'TRUE' : 'FALSE';
    expect(icalBool).toMatch(/^(TRUE|FALSE)$/);
  });

  test.prop('Custom X- properties start with X-', [
    fc.string({ minLength: 1 })
  ])((customProp) => {
    const xProp = `X-${customProp.toUpperCase()}`;
    expect(xProp).toMatch(/^X-[A-Z0-9-]+$/);
  });

  test.prop('Property parameters are properly formatted', [
    fc.string({ minLength: 1 }),
    fc.string()
  ])((paramName, paramValue) => {
    const param = `;${paramName.toUpperCase()}=${paramValue}`;
    expect(param).toMatch(/^;[A-Z0-9-]+=.+$/);
  });

  test.prop('Continuation lines start with a space', [
    fc.string()
  ])((content) => {
    const continuationLine = ` ${content}`;
    expect(continuationLine).toMatch(/^ .+$/);
  });
});