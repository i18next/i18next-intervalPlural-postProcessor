### 3.0.0

- **BREAKING** changes regex from `/\((\S*)\).*{((.|\n)*)}/` to `/\((\S*)\).*?\[((.|\n)*)\]/` -> from (condition){value} to (condition)[value] to fix [#206](https://github.com/i18next/i18next-intervalPlural-postProcessor/issues/206) and [#221](https://github.com/i18next/i18next-intervalPlural-postProcessor/issues/221)