# Introduction

This is a i18next postProcessor enabling interval based plurals.

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-intervalPlural-postProcessor), bower or [downloaded](https://github.com/i18next/i18next-intervalPlural-postProcessor/blob/master/i18nextIntervalPluralPostProcessor.min.js) from this repo.

```
# npm package
$ npm install i18next-intervalPlural-postProcessor

# bower
$ bower install i18next/i18next-intervalPlural-postProcessor
```

Wiring up:

```js
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalPlural-postProcessor';

i18next
  .use(intervalPlural)
  .init(i18nextOptions);
```

# usage sample

```js
// given loaded resources
// translation: {
//   key1: '{{count}} item',
//    key1_plural: '{{count}} items',
//    key1_interval: '(1){one item};(2-7){a few items};(7-inf){a lot of items};',
//    key2: '{{count}} item',
//    key2_plural: '{{count}} items',
//    key2_interval: '(1){one item};(2-7){a few items};'
// }

i18next.t('key1_interval', { postProcess: 'interval', count: 1 }); // -> one item
i18next.t('key1_interval', { postProcess: 'interval', count: 4 }); // -> a few items
i18next.t('key1_interval', { postProcess: 'interval', count: 100 }); // -> a lot of items

// if a interval is not specified i18next fallbacks to classic plural
i18next.t('key2_interval', { postProcess: 'interval', count: 1 }); // -> one item
i18next.t('key2_interval', { postProcess: 'interval', count: 4 }); // -> a few items
i18next.t('key2_interval', { postProcess: 'interval', count: 100 }); // -> 100 items
```

# setting own options

```js
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalPlural-postProcessor';

intervalPlural.setOptions({
  // this are the defaults
  intervalSeparator: ';',
  intervalRegex: /^\((\S*)\){(.*)}$/,
  intervalSuffix: '_interval'
});

i18next
  .use(intervalPlural)
  .init(i18nextOptions);
```
