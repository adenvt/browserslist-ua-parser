import UAParser from 'ua-parser-js'
import { agents } from 'caniuse-lite'
import { coerce, satisfies } from 'semver'

export const KNOWN_BROWSERS = Object.keys(agents)

export function findVersion (browser: string, version_: string): string | undefined {
  const agent   = agents[browser]
  const version = coerce(version_, { loose: true })

  if (agent && version) {
    return agent.versions.filter(Boolean).reverse().find((value) => {
      if (!value)
        return false

      if (value === 'all')
        return true

      if (value.includes('-')) {
        const [start,]  = value.split('-')
        const contrains = `>=${start}`

        return satisfies(version, contrains, true)
      }

      if (value.includes('.')) {
        return satisfies(version, `>=${value}`, true)
      }

      return value === version.major.toString()
    }) || undefined
  }

  return version ? `${version?.major}.${version?.minor}` : undefined
}

export function normalizeUA (uaString: string): string {
  /* Normalizing Iphone */
  const iPhoneRegex = /iPhone OS (\d+\.\d+(\.\d+)?)/
  const match       = uaString.match(iPhoneRegex)

  if (match) {
    const version = coerce(match[1], { loose: true })

    return uaString
      .replace(iPhoneRegex, `iPhone OS ${version?.major}_${version?.minor}_${version?.patch}`)
  }

  return uaString
    .replace(/XiaoMi\/MiuiBrowser\/.*$/, '')
    .replace(/PaleMoon\/.*$/, '')
    .replace(/DuckDuckGo\/\d+\s/, '')
}

export interface UaInfo {
  browser: string | undefined,
  version: string | undefined,
}

export function findBrowser (uaString: string): UaInfo {
  const parsedUA             = UAParser(normalizeUA(uaString))
  const parsedBrowserVersion = coerce(parsedUA.browser.version, { loose: true })?.version
  const parsedOSVersion      = coerce(parsedUA.os.version, { loose: true })?.version
  const parsedEngineVersion  = coerce(parsedUA.engine.version, { loose: true })?.version

  // Case A: For Safari on iOS, the use the browser version
  if (parsedUA.browser.name === 'Safari' && parsedUA.os.name === 'iOS') {
    return {
      browser: 'ios_saf',
      version: parsedBrowserVersion,
    }
  }

  // Case B: The browser on iOS didn't report as safari,
  // so we use the iOS version as a proxy to the browser
  // version. This is based on the assumption that the
  // underlying Safari Engine used will be *atleast* equal
  // to the iOS version it's running on.
  if (parsedUA.os.name === 'iOS') {
    return {
      browser: 'ios_saf',
      version: parsedOSVersion
    }
  }

  if (parsedUA.browser.name === 'Mobile Safari') {
    return {
      browser: 'ios_saf',
      version: parsedBrowserVersion,
    }
  }

  if (
    (parsedUA.browser.name === 'Opera' && parsedUA.device.type === 'mobile') ||
    parsedUA.browser.name === 'Opera Mobi'
  ) {
    return {
      browser: 'op_mob',
      version: parsedBrowserVersion
    }
  }

  if (parsedUA.browser.name === 'Samsung Browser') {
    return {
      browser: 'samsung',
      version: parsedBrowserVersion
    }
  }

  if (parsedUA.browser.name === 'IE') {
    return {
      browser: 'ie',
      version: parsedBrowserVersion
    }
  }

  if (parsedUA.browser.name === 'IEMobile') {
    return {
      browser: 'ie_mob',
      version: parsedBrowserVersion
    }
  }

  // Use engine version for gecko-based browsers
  if (parsedUA.engine.name === 'Gecko') {
    return {
      browser: 'firefox',
      version: parsedEngineVersion
    }
  }

  // Use engine version for blink-based browsers
  if (parsedUA.engine.name === 'Blink') {
    return {
      browser: 'chrome',
      version: parsedEngineVersion
    }
  }

  // Chrome based browsers pre-blink (WebKit)
  if (
    parsedUA.browser.name &&
    ['Chrome', 'Chromium', 'Chrome WebView', 'Chrome Headless'].includes(parsedUA.browser.name)
  ) {
    return {
      browser: 'chrome',
      version: parsedBrowserVersion
    }
  }

  if (parsedUA.browser.name === 'Android Browser') {
    // Versions prior to Blink were based
    // on the OS version. Only after this
    // did android start using system chrome for web-views
    return {
      browser: 'android',
      version: parsedOSVersion
    }
  }

  if (parsedUA.browser.name === 'UCBrowser') {
    return {
      browser: 'and_uc',
      version: parsedBrowserVersion
    }
  }

  return {
    browser: parsedUA.browser.name?.toLowerCase(),
    version: parsedBrowserVersion
  }
}

export function parseUA (uaString: string): UaInfo {
  const ua      = findBrowser(uaString)
  const version = findVersion(ua.browser!, ua.version!)

  return {
    browser: ua.browser,
    version: version,
  }
}
