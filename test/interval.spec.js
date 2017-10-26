import i18next from 'i18next';
import intervalPostProcessor from '../src/';
import { expect } from 'chai';

describe('interval plural', () => {
  before(() => {
    i18next
      .use(intervalPostProcessor)
      .init({
        lng: 'en'
      });
  });

  describe('basic', () => {

    before(() => {
      i18next.addResourceBundle('en', 'test1', {
        key1: '{{count}} item',
        key1_plural: '{{count}} items',
        key1_interval: '(1){one item};(2-7){a few items};(7-inf){a lot of items};',
        key2: '{{count}} item',
        key2_plural: '{{count}} items',
        key2_interval: '(1){one item};(2-7){a few items};'
      });
      i18next.addResourceBundle('en', 'test2', {
        key3: '{{count}} item',
        key3_plural: '{{count}} items',
        key3_interval: '(1){one item};(2-7){a few items};(7-inf){a lot of items};',
        key4: '{{count}} item',
        key4_plural: '{{count}} items',
        key4_interval: '(1){one item};(2-7){a few items};'
      });
      i18next.addResourceBundle('en', 'test3', {
        key3: '{{count}} item',
        key3_plural: '{{count}} items',
        key3_interval: '(1) {one item}; (2-7) {a few items}; (7-inf) {a lot of items};',
        key4: '{{count}} item',
        key4_plural: '{{count}} items',
        key4_interval: '(1){one item}; (2-7){a few items}; '
      });
      i18next.setDefaultNamespace('test1');
    });

    var tests = [
      {args: ['key1_interval', { postProcess: 'interval', count: 1}], expected: 'one item'},
      {args: ['key1_interval', { postProcess: 'interval', count: 3}], expected: 'a few items'},
      {args: ['key1_interval', { postProcess: 'interval', count: 100}], expected: 'a lot of items'},

      {args: ['key2_interval', { postProcess: 'interval', count: 1}], expected: 'one item'},
      {args: ['key2_interval', { postProcess: 'interval', count: 3}], expected: 'a few items'},
      {args: ['key2_interval', { postProcess: 'interval', count: 100}], expected: '100 items'},

      {args: ['test2:key4_interval', { postProcess: 'interval', count: 1}], expected: 'one item'},
      {args: ['test2:key4_interval', { postProcess: 'interval', count: 3}], expected: 'a few items'},
      {args: ['test2:key4_interval', { postProcess: 'interval', count: 100}], expected: '100 items'},

      {args: ['key4_interval', { ns: 'test2', postProcess: 'interval', count: 1}], expected: 'one item'},
      {args: ['key4_interval', { ns: 'test2', postProcess: 'interval', count: 3}], expected: 'a few items'},
      {args: ['key4_interval', { ns: 'test2', postProcess: 'interval', count: 100}], expected: '100 items'},

      {args: ['key4_interval', { ns: 'test3', postProcess: 'interval', count: 1}], expected: 'one item'},
      {args: ['key4_interval', { ns: 'test3', postProcess: 'interval', count: 3}], expected: 'a few items'},
      {args: ['key4_interval', { ns: 'test3', postProcess: 'interval', count: 100}], expected: '100 items'}
    ];

    tests.forEach((test) => {
      it('correctly translates for ' + JSON.stringify(test.args) + ' args', () => {
        expect(i18next.t.apply(i18next, test.args)).to.eql(test.expected);
      });
    });
  });
});
