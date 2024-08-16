import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseRawGrammar, Registry, INITIAL } from 'vscode-textmate'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const grammarPath = path.join(__dirname, '..', 'syntaxes', 'extended_ical.tmLanguage.json')
const grammarContent = fs.readFileSync(grammarPath, 'utf8')
const rawGrammar = parseRawGrammar(grammarContent, grammarPath)

const registry = new Registry()
registry.addGrammar(rawGrammar)

async function tokenizeLine(line) {
  const grammar = await registry.loadGrammar('source.icalendar')
  let ruleStack = INITIAL
  const lineTokens = grammar.tokenizeLine(line, ruleStack)
  return lineTokens.tokens
}

describe('iCalendar Grammar', () => {
  it('tokenizes BEGIN and END components', async () => {
    const beginTokens = await tokenizeLine('BEGIN:VCALENDAR')
    expect(beginTokens).toEqual([
      { startIndex: 0, endIndex: 5, scopes: ['source.icalendar', 'keyword.control.icalendar'] },
      { startIndex: 5, endIndex: 6, scopes: ['source.icalendar'] },
      { startIndex: 6, endIndex: 15, scopes: ['source.icalendar', 'support.class.icalendar'] }
    ])

    const endTokens = await tokenizeLine('END:VEVENT')
    expect(endTokens).toEqual([
      { startIndex: 0, endIndex: 3, scopes: ['source.icalendar', 'keyword.control.icalendar'] },
      { startIndex: 3, endIndex: 4, scopes: ['source.icalendar'] },
      { startIndex: 4, endIndex: 10, scopes: ['source.icalendar', 'support.class.icalendar'] }
    ])
  })

  it('tokenizes date properties', async () => {
    const tokens = await tokenizeLine('DTSTART:20230615T090000Z')
    expect(tokens).toEqual([
      { startIndex: 0, endIndex: 7, scopes: ['source.icalendar', 'support.function.date.icalendar'] },
      { startIndex: 7, endIndex: 8, scopes: ['source.icalendar'] },
      { startIndex: 8, endIndex: 24, scopes: ['source.icalendar', 'constant.numeric.date-time.icalendar'] }
    ])
  })

  it('tokenizes content properties', async () => {
    const tokens = await tokenizeLine('SUMMARY:Team Meeting')
    expect(tokens).toEqual([
      { startIndex: 0, endIndex: 7, scopes: ['source.icalendar', 'support.function.content.icalendar'] },
      { startIndex: 7, endIndex: 8, scopes: ['source.icalendar'] },
      { startIndex: 8, endIndex: 20, scopes: ['source.icalendar'] }
    ])
  })

  it('tokenizes RRULE', async () => {
    const tokens = await tokenizeLine('RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR')
    expect(tokens).toEqual([
      { startIndex: 0, endIndex: 5, scopes: ['source.icalendar', 'support.function.icalendar'] },
      { startIndex: 5, endIndex: 6, scopes: ['source.icalendar'] },
      { startIndex: 6, endIndex: 10, scopes: ['source.icalendar', 'support.constant.icalendar'] },
      { startIndex: 10, endIndex: 11, scopes: ['source.icalendar'] },
      { startIndex: 11, endIndex: 17, scopes: ['source.icalendar', 'support.constant.icalendar'] },
      { startIndex: 17, endIndex: 18, scopes: ['source.icalendar'] },
      { startIndex: 18, endIndex: 23, scopes: ['source.icalendar', 'support.constant.icalendar'] },
      { startIndex: 23, endIndex: 24, scopes: ['source.icalendar'] },
      { startIndex: 24, endIndex: 26, scopes: ['source.icalendar', 'support.constant.weekday.icalendar'] },
      { startIndex: 26, endIndex: 27, scopes: ['source.icalendar'] },
      { startIndex: 27, endIndex: 29, scopes: ['source.icalendar', 'support.constant.weekday.icalendar'] },
      { startIndex: 29, endIndex: 30, scopes: ['source.icalendar'] },
      { startIndex: 30, endIndex: 32, scopes: ['source.icalendar', 'support.constant.weekday.icalendar'] }
    ])
  })

  it('tokenizes custom properties', async () => {
    const tokens = await tokenizeLine('X-CUSTOM-PROP:Some custom value')
    expect(tokens).toEqual([
      { startIndex: 0, endIndex: 13, scopes: ['source.icalendar', 'keyword.other.icalCustom'] },
      { startIndex: 13, endIndex: 14, scopes: ['source.icalendar'] },
      { startIndex: 14, endIndex: 32, scopes: ['source.icalendar'] }
    ])
  })

  it('tokenizes parameters', async () => {
    const tokens = await tokenizeLine('ATTENDEE;CN=John Doe:mailto:john@example.com')
    expect(tokens).toEqual([
      { startIndex: 0, endIndex: 8, scopes: ['source.icalendar', 'support.function.icalendar'] },
      { startIndex: 8, endIndex: 9, scopes: ['source.icalendar', 'variable.parameter.icalendar'] },
      { startIndex: 9, endIndex: 11, scopes: ['source.icalendar', 'variable.parameter.icalendar'] },
      { startIndex: 11, endIndex: 12, scopes: ['source.icalendar'] },
      { startIndex: 12, endIndex: 20, scopes: ['source.icalendar'] },
      { startIndex: 20, endIndex: 21, scopes: ['source.icalendar'] },
      { startIndex: 21, endIndex: 42, scopes: ['source.icalendar'] }
    ])
  })

  it('tokenizes quoted strings', async () => {
    const tokens = await tokenizeLine('DESCRIPTION:"This is a quoted string with \\"escaped\\" quotes"')
    expect(tokens).toEqual([
      { startIndex: 0, endIndex: 11, scopes: ['source.icalendar', 'support.function.content.icalendar'] },
      { startIndex: 11, endIndex: 12, scopes: ['source.icalendar'] },
      { startIndex: 12, endIndex: 57, scopes: ['source.icalendar', 'string.quoted.double.icalendar'] }
    ])
  })

  it('tokenizes line continuation', async () => {
    const tokens = await tokenizeLine(' on the next line')
    expect(tokens).toEqual([
      { startIndex: 0, endIndex: 1, scopes: ['source.icalendar', 'punctuation.separator.continuation.icalendar'] },
      { startIndex: 1, endIndex: 17, scopes: ['source.icalendar'] }
    ])
  })
})