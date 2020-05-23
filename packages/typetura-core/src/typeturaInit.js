// Copyright 2018-2020 Typetura LLC.
// https://github.com/typetura/typetura.js

import typeturize from './typeturize';
import { createStyleSheet } from './utils/';

const typeturaInit = (options = {}) => {
  const { baseSize = 20 } = options;

  return new Promise((resolve, reject) => {
    if (typeof baseSize !== 'number') {
      return reject(new Error('baseSize must be a number'));
    }

    const stylesheet = createStyleSheet(baseSize);

    // Write typetura properties to the top of the document head to avoid cascade conflicts
    document.head.insertBefore(stylesheet, document.head.firstChild);
    typeturize(document.documentElement);

    resolve();
  });
};

export default typeturaInit;
