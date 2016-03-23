import 'babel-polyfill';

import retax from '../src/client';

retax.config({
  client: {
    keepInitialState: false,
  },
});

retax.bootstrap();

console.log(retax);
