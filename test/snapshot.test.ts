
describe('iCalendar Syntax Snapshot Tests', () => {
  it('should match snapshot for VCALENDAR', async () => {
    await testGrammar(icalFixtures.valid[0], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for VTODO', async () => {
    await testGrammar(icalFixtures.valid[1], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for VJOURNAL', async () => {
    await testGrammar(icalFixtures.valid[2], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for VFREEBUSY', async () => {
    await testGrammar(icalFixtures.valid[3], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for VTIMEZONE', async () => {
    await testGrammar(icalFixtures.valid[4], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for VALARM', async () => {
    await testGrammar(icalFixtures.valid[5], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for SUMMARY and DESCRIPTION', async () => {
    await testGrammar(icalFixtures.valid[6], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for DTSTART and DTEND', async () => {
    await testGrammar(icalFixtures.valid[7], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for CALSCALE and METHOD', async () => {
    await testGrammar(icalFixtures.valid[8], 'source.icalendar', undefined, { update: true });
  });

  it('should match snapshot for ATTACH and CATEGORIES', async () => {
    await testGrammar(icalFixtures.valid[9], 'source.icalendar', undefined, { update: true });
  });
});