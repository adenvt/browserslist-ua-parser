import {
  KNOWN_BROWSERS,
  parseUA,
  findBrowser,
  findVersion,
  normalizeUA,
} from '.'
import UAParser from 'ua-parser-js'

describe('KNOWN_BROWSERS', () => {
  it('should return list of known browser from caniuse data', () => {
    expect(KNOWN_BROWSERS).toStrictEqual([
      'ie',
      'edge',
      'firefox',
      'chrome',
      'safari',
      'opera',
      'ios_saf',
      'op_mini',
      'android',
      'bb',
      'op_mob',
      'and_chr',
      'and_ff',
      'ie_mob',
      'and_uc',
      'samsung',
      'and_qq',
      'baidu',
      'kaios'
    ])
  })
})

describe('findBrowser', () => {
  it('should export the findBrowser function', () => {
    expect(typeof findBrowser).toBe('function')
  })
})

describe('findVersion', () => {
  it('should export the findVersion function', () => {
    expect(typeof findVersion).toBe('function')
  })
})

describe('normalizeUA', () => {
  it('should export the normalizeUA function', () => {
    expect(typeof normalizeUA).toBe('function')
  })
})

describe('parseUA', () => {
  const browsers: [string, string | undefined, string | undefined][] = [
    [
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      'chrome',
      '108',
    ],
    [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4',
      'ios_saf',
      '8',
    ],
    [
      '"Mozilla/5.0 (iPhone 6s Plus; CPU iPhone OS 15.4.1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/XXXXX"',
      'ios_saf',
      '15.4',
    ],
    [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/574.31 (KHTML, like Gecko) Version/14.4.61 Mobile/2OKM44 Safari/574.31',
      'ios_saf',
      '14.0-14.4',
    ],
    [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1',
      'ios_saf',
      '15.6-15.8',
    ],
    [
      'Mozilla/5.0 (Linux; U; Android 10; en-US; RMX1901 Build/QKQ1.190918.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 UCBrowser/13.4.0.1306 Mobile Safari/537.36',
      'chrome',
      '78',
    ],
    [
      'Opera/9.80 (S60; SymbOS; Opera Mobi/447; U; en) Presto/2.4.18 Version/10.00',
      'op_mob',
      '10',
    ],
    [
      'Mozilla/5.0 (Linux; Android 8.0.0; RNE-L21) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36 OPR/58.2.2878.53403',
      'chrome',
      '81',
    ],
    [
      'Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G950F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
      'samsung',
      '16.0',
    ],
    [
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
      'ie',
      '10',
    ],
    [
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/10.0)',
      'ie_mob',
      '10',
    ],
    [
      'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      'android',
      '4',
    ],
    [
      'Mozilla/5.0 (X11; Linux ppc64le; rv:75.0) Gecko/20100101 Firefox/75.0',
      'firefox',
      '75',
    ],
    [
      'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27',
      'safari',
      '5',
    ],
    [
      'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.10 (KHTML, like Gecko) Chrome/8.0.552.224 Safari/534.10 ChromePlus/1.5.2.0',
      'chrome',
      '8',
    ],
    [
      'Opera/9.80 (J2ME/MIDP; Opera Mini/9 (Compatible; MSIE:9.0; iPhone; BlackBerry9700; AppleWebKit/24.746; U; en) Presto/2.5.25 Version/10.54',
      'op_mini',
      'all',
    ],
    [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)',
      'webkit',
      '605.1',
    ],
    [
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 HeyTapBrowser/25.8.7.0.2beta',
      'heytap',
      '25.8',
    ],
    [
      'Mozilla/5.0 (Linux; Android 5.1.1; SAMSUNG SM-J111F Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.5 Chrome/38.0.2125.102 Mobile Safari/537.36',
      'samsung',
      undefined,
    ],
    [
      'Invalid User Agent',
      undefined,
      undefined,
    ],
  ]

  it.each(browsers)('should able to parse UA Agent (%s)', (ua, browser, version) => {
    expect(parseUA(ua)).toStrictEqual({ browser, version })
  })
})
