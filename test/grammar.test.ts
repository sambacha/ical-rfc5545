// test/icalSyntax.test.ts

import * as path from 'node:path';
import * as getOnigasmModule from 'vscode-oniguruma';
import { createRegistry, createGrammarTestHelper } from 'vscode-tmgrammar-test';
import { icalFixtures } from './icalFixtures';

const grammarPath = path.resolve(__dirname, '../syntaxes/ical.tmLanguage.json');
const onigasmModulePromise = getOnigasmModule();

const registry = createRegistry({
  loadGrammar: async () => {
    const response = await fetch(grammarPath);
    const grammar = await response.json();
    return grammar;
  },
  getOnigasmModule: () => onigasmModulePromise,
});

const { testGrammar } = createGrammarTestHelper(registry);

describe('iCalendar Syntax Tests', () => {
  it('should highlight BEGIN:VCALENDAR correctly', async () => {
    await testGrammar(icalFixtures.valid[0], 'source.icalendar', [
      { line: 0, token: 'keyword.control.begin.icalendar' },
    ]);
  });

  it('should highlight END:VCALENDAR correctly', async () => {
    await testGrammar(icalFixtures.valid[0], 'source.icalendar', [
      { line: 9, token: 'keyword.control.end.icalendar' },
    ]);
  });

  it('should highlight date-time values correctly', async () => {
    await testGrammar(icalFixtures.valid[0], 'source.icalendar', [
      { line: 4, token: 'constant.numeric.date-time.icalendar' },
      { line: 5, token: 'constant.numeric.date-time.icalendar' },
      { line: 6, token: 'constant.numeric.date-time.icalendar' },
    ]);
  });

  it('should highlight iCalendar components correctly', async () => {
    await testGrammar(icalFixtures.valid[0], 'source.icalendar', [
      { line: 0, token: 'support.class.icalendar' },
      { line: 2, token: 'support.class.icalendar' },
    ]);
  });

  it('should highlight property names correctly', async () => {
    await testGrammar(icalFixtures.valid[0], 'source.icalendar', [
      { line: 3, token: 'support.function.date.icalendar' },
      { line: 4, token: 'support.function.date.icalendar' },
      { line: 5, token: 'support.function.date.icalendar' },
      { line: 6, token: 'support.function.content.icalendar' },
      { line: 7, token: 'support.function.content.icalendar' },
      { line: 8, token: 'support.function.content.icalendar' },
    ]);
  });

  it('should highlight boolean values correctly', async () => {
    await testGrammar(icalFixtures.valid[15], 'source.icalendar', [
      { line: 10, token: 'constant.language.boolean.icalendar' },
    ]);
  });

  it('should highlight custom X- properties correctly', async () => {
    await testGrammar(icalFixtures.valid[11], 'source.icalendar', [
      { line: 0, token: 'comment.line.icalendar' },
    ]);
  });

  it('should highlight property parameters correctly', async () => {
    await testGrammar(icalFixtures.valid[12], 'source.icalendar', [
      { line: 0, token: 'variable.parameter.icalendar' },
      { line: 1, token: 'variable.parameter.icalendar' },
    ]);
  });

  it('should highlight continuation lines correctly', async () => {
    await testGrammar(icalFixtures.valid[0], 'source.icalendar', [
      { line: 1, token: 'punctuation.separator.continuation.icalendar' },
    ]);
  });

  it('should highlight quoted strings correctly', async () => {
    await testGrammar(icalFixtures.valid[0], 'source.icalendar', [
      { line: 7, token: 'string.quoted.double.icalendar' },
    ]);
  });
});