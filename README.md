# browserslist-ua-parser

> Parse User-Agent into browserslist's compatible format

## What is it?

This is User-Agent parser, but unlike others, it only returns browser name and version in [browserslist's format](https://github.com/browserslist/browserslist#browsers). This helps you create [Custom Usage Data][CUD].

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

- This library categorized the browsers based on their layout engine instead of their real browser's name,
like all browsers on iOS will return `ios_saf` (Because all browsers in iOS use Webkit), or
Browsers based on Chromium, such as `MiuiBrowser` will return `chrome`.

  This because this library intentionally used for detecting features using [Browserslist][Browserslist], and that is how Browserslist work.

- Chrome Android will be parsed as `chrome` instead of `and_chr`. This because Browserslist only work with last version on mobile browser ([see this comment][Comment]). This also applied to Firefox.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details

[CUD]: https://github.com/browserslist/browserslist#browsers
[Comment]: https://github.com/Fyrd/caniuse/issues/2413#issuecomment-206673558
[Browserslist]: https://github.com/browserslist/browserslist
