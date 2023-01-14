# browserslist-ua-parser

> Parse User-Agent into browserslist's compatible format

## What is it?

This is User-Agent parser, but unlike others, it only returns browser name and version in [browserslist's format](https://github.com/browserslist/browserslist#browsers). This helps you create [Custom Usage Data](https://github.com/browserslist/browserslist#browsers).

## Installation

with npm

```bash
npm install browserslist-ua-parser
```
with yarn

```bash
yarn add browserslist-ua-parser
```

with pnpm
```bash
pnpm add browserslist-ua-parser
```

## Usage

```js
import { parseUA } from 'browserslist-ua-parser'

parseUA('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36')
// { browser: 'chrome', version: '108' }
```

## Notes

- All Browsers on iOS will be parsed as `ios_saf`, even if the browser is actually `chrome`. This is because all browsers on iOS use same engine, Webkit,
- Chrome Android will parsed as `chrome` instead of `and_chr`. This because browserlist only work with last version on mobile browser ([see this comment](https://github.com/Fyrd/caniuse/issues/2413#issuecomment-206673558)). This also applied to Firefox.
- Some unknown browsers will be parsed to equivalent browsers:
  - MIUI Browser and DuckDuckGo will be parsed as `chrome`.
  - PaleMoon will be parsed as `firefox`.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
