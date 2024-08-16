const path = require('path');
const { runTests } = require('vscode-tmgrammar-test');

const grammarPath = path.join(__dirname, '..', 'syntaxes', 'icalendar.tmLanguage.json');

describe('iCalendar Grammar', () => {
  runTests({
    grammarPath,
    testCases: [
      {
        name: 'BEGIN and END components',
        text: [
          'BEGIN:VCALENDAR',
          'END:VCALENDAR',
          'BEGIN:VEVENT',
          'END:VEVENT'
        ],
        tokens: [
          [
            { startIndex: 0, endIndex: 5, scopes: ['source.icalendar', 'keyword.control.icalendar'] },
            { startIndex: 5, endIndex: 6, scopes: ['source.icalendar'] },
            { startIndex: 6, endIndex: 15, scopes: ['source.icalendar', 'support.class.icalendar'] }
          ],
          [
            { startIndex: 0, endIndex: 3, scopes: ['source.icalendar', 'keyword.control.icalendar'] },
            { startIndex: 3, endIndex: 4, scopes: ['source.icalendar'] },
            { startIndex: 4, endIndex: 13, scopes: ['source.icalendar', 'support.class.icalendar'] }
          ],
          [
            { startIndex: 0, endIndex: 5, scopes: ['source.icalendar', 'keyword.control.icalendar'] },
            { startIndex: 5, endIndex: 6, scopes: ['source.icalendar'] },
            { startIndex: 6, endIndex: 12, scopes: ['source.icalendar', 'support.class.icalendar'] }
          ],
          [
            { startIndex: 0, endIndex: 3, scopes: ['source.icalendar', 'keyword.control.icalendar'] },
            { startIndex: 3, endIndex: 4, scopes: ['source.icalendar'] },
            { startIndex: 4, endIndex: 10, scopes: ['source.icalendar', 'support.class.icalendar'] }
          ]
        ]
      },
      {
        name: 'Date and content properties',
        text: [
          'DTSTART:20230615T090000Z',
          'SUMMARY:Team Meeting'
        ],
        tokens: [
          [
            { startIndex: 0, endIndex: 7, scopes: ['source.icalendar', 'support.function.date.icalendar'] },
            { startIndex: 7, endIndex: 8, scopes: ['source.icalendar'] },
            { startIndex: 8, endIndex: 24, scopes: ['source.icalendar', 'constant.numeric.date-time.icalendar'] }
          ],
          [
            { startIndex: 0, endIndex: 7, scopes: ['source.icalendar', 'support.function.content.icalendar'] },
            { startIndex: 7, endIndex: 8, scopes: ['source.icalendar'] },
            { startIndex: 8, endIndex: 20, scopes: ['source.icalendar'] }
          ]
        ]
      },
      {
        name: 'Other properties',
        text: [
          'RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR',
          'UID:12345678-1234-1234-1234-123456789012'
        ],
        tokens: [
          [
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
          ],
          [
            { startIndex: 0, endIndex: 3, scopes: ['source.icalendar', 'support.function.icalendar'] },
            { startIndex: 3, endIndex: 4, scopes: ['source.icalendar'] },
            { startIndex: 4, endIndex: 40, scopes: ['source.icalendar'] }
          ]
        ]
      },
      {
        name: 'Custom property',
        text: ['X-CUSTOM-PROP:Some custom value'],
        tokens: [
          [
            { startIndex: 0, endIndex: 13, scopes: ['source.icalendar', 'keyword.other.icalCustom'] },
            { startIndex: 13, endIndex: 14, scopes: ['source.icalendar'] },
            { startIndex: 14, endIndex: 32, scopes: ['source.icalendar'] }
          ]
        ]
      },
      {
        name: 'Parameter',
        text: ['ATTENDEE;CN=John Doe:mailto:john@example.com'],
        tokens: [
          [
            { startIndex: 0, endIndex: 8, scopes: ['source.icalendar', 'support.function.icalendar'] },
            { startIndex: 8, endIndex: 9, scopes: ['source.icalendar', 'variable.parameter.icalendar'] },
            { startIndex: 9, endIndex: 11, scopes: ['source.icalendar', 'variable.parameter.icalendar'] },
            { startIndex: 11, endIndex: 12, scopes: ['source.icalendar'] },
            { startIndex: 12, endIndex: 20, scopes: ['source.icalendar'] },
            { startIndex: 20, endIndex: 21, scopes: ['source.icalendar'] },
            { startIndex: 21, endIndex: 42, scopes: ['source.icalendar'] }
          ]
        ]
      },
      {
        name: 'Quoted string',
        text: ['DESCRIPTION:"This is a quoted string with \\"escaped\\" quotes"'],
        tokens: [
          [
            { startIndex: 0, endIndex: 11, scopes: ['source.icalendar', 'support.function.content.icalendar'] },
            { startIndex: 11, endIndex: 12, scopes: ['source.icalendar'] },
            { startIndex: 12, endIndex: 57, scopes: ['source.icalendar', 'string.quoted.double.icalendar'] }
          ]
        ]
      },
      {
        name: 'Line continuation',
        text: ['DESCRIPTION:This is a long description that continues', ' on the next line'],
        tokens: [
          [
            { startIndex: 0, endIndex: 11, scopes: ['source.icalendar', 'support.function.content.icalendar'] },
            { startIndex: 11, endIndex: 12, scopes: ['source.icalendar'] },
            { startIndex: 12, endIndex: 49, scopes: ['source.icalendar'] }
          ],
          [
            { startIndex: 0, endIndex: 1, scopes: ['source.icalendar', 'punctuation.separator.continuation.icalendar'] },
            { startIndex: 1, endIndex: 17, scopes: ['source.icalendar'] }
          ]
        ]
      }
    ]
  });
});