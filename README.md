# `i18next-intervalPlural-postProcessor`

## Introduction

[![Coveralls](https://img.shields.io/coveralls/i18next/i18next-intervalPlural-postProcessor/master.svg?style=flat-square)](https://coveralls.io/github/i18next/i18next-intervalPlural-postProcessor)
[![npm version](https://img.shields.io/npm/v/i18next-intervalplural-postprocessor.svg?style=flat-square)](https://www.npmjs.com/package/i18next-intervalplural-postprocessor)

This is a i18next postProcessor enabling interval based plurals.

## Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-intervalplural-postprocessor), bower or [downloaded](https://github.com/i18next/i18next-intervalPlural-postProcessor/blob/master/i18nextIntervalPluralPostProcessor.min.js) from this repo.

```sh
# npm package
$ npm install i18next-intervalplural-postprocessor
```

- If you don't use a module loader it will be added to `window.i18nextIntervalPluralPostProcessor`

Wiring up:

```js
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';

i18next
  .use(intervalPlural)
  .init(i18nextOptions);
```

## Usage sample

```js
// given loaded resources
// translation: {
//    key1_one: '{{count}} item',
//    key1_other: '{{count}} items',
//    key1_interval: '(1)[one item];(2-7)[a few items];(7-inf)[a lot of items];',
//    key2_one: '{{count}} item',
//    key2_other: '{{count}} items',
//    key2_interval: '(1)[one item];(2-7)[a few items];'
// }

i18next.t('key1_interval', { postProcess: 'interval', count: 1 }); // -> one item
i18next.t('key1_interval', { postProcess: 'interval', count: 4 }); // -> a few items
i18next.t('key1_interval', { postProcess: 'interval', count: 100 }); // -> a lot of items

// if a interval is not specified i18next fallbacks to classic plural
i18next.t('key2_interval', { postProcess: 'interval', count: 1 }); // -> one item
i18next.t('key2_interval', { postProcess: 'interval', count: 4 }); // -> a few items
i18next.t('key2_interval', { postProcess: 'interval', count: 100 }); // -> 100 items
```

## Setting own options

```js
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';

intervalPlural.setOptions({
  // these are the defaults
  intervalSeparator: ';',
  intervalRegex: /\((\S*)\).*?\[((.|\n)*)\]/, // pre 3.0 /\((\S*)\).*{((.|\n)*)}/,
  intervalSuffix: '_interval'
});

i18next
  .use(intervalPlural)
  .init(i18nextOptions);
```

---

<h3 align="center">Gold Sponsors</h3>

<p align="center">
  <a href="https://locize.com/" target="_blank">
    <img src="https://raw.githubusercontent.com/i18next/i18next/master/assets/locize_sponsor_240.gif" width="240px">
  </a>
</p>
