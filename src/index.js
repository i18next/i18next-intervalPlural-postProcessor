function intervalMatches(interval, count) {
  if (interval.indexOf('-') > -1) {
    var p = interval.split('-');
    if (p[1] === 'inf') {
      const from = parseInt(p[0], 10);
      return count >= from;
    } else {
      const from = parseInt(p[0], 10);
      const to = parseInt(p[1], 10);
      return count >= from && count <= to;
    }
  } else {
    const match = parseInt(interval, 10);
    return match === count;
  }
}


export default {
  name: 'interval',
  type: 'postProcessor',

  options: {
    intervalSeparator: ';',
    intervalRegex: /\((\S*)\).*?\[((.|\n)*)\]/,
    intervalSuffix: '_interval'
  },

  setOptions(options) {
    this.options = {...this.options, ...options};
  },

  process(value, key, options, translator) {
    const p = value.split(this.options.intervalSeparator);

    let found;
    p.forEach((iv) => {
      if (found) return;
      let match = this.options.intervalRegex.exec(iv);

      if (match && intervalMatches(match[1], options.count || 0)) {
        found = match[2];
      }
    });

    // not found fallback to classical plural
    if (!found) {
      let newOptions = {...{}, ...options};
      if (typeof newOptions.postProcess === 'string') {
        delete newOptions.postProcess;
      } else {
        const index = newOptions.postProcess.indexOf('interval');    // <-- Not supported in <IE9
        if (index !== -1) newOptions.postProcess.splice(index, 1);
      }

      let newKeys;
      if (typeof key === 'string') {
        newKeys = key.replace(this.options.intervalSuffix, '')
      } else if (key.length > -1) {
        newKeys = key.map((k) => k.replace(this.options.intervalSuffix, ''))
      }
      if (newKeys) found = translator.translate(newKeys, newOptions);
    }

    return found || value;
  }
};
