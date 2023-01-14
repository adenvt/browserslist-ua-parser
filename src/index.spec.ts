import { parseUA } from '.'

const browsers: [string, string | undefined, string | undefined][] = [
  [
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'chrome',
    '108',
  ],
  [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4',
    'ios_saf',
    '8.1-8.4',
  ],
  [
    '"Mozilla/5.0 (iPhone 6s Plus; CPU iPhone OS 15.4.1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/XXXXX"',
    'ios_saf',
    '15.4',
  ],
  [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/574.31 (KHTML, like Gecko) Version/14.4.61 Mobile/2OKM44 Safari/574.31',
    'ios_saf',
    '15.5',
  ],
  [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1',
    'ios_saf',
    '15.6',
  ],
]

test.each(browsers)('should able to parse UA Agent', (ua, browser, version) => {
  expect(parseUA(ua)).toStrictEqual({ browser, version })
})
