import 'babel-polyfill';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Route } from 'react-router';
import createLogger from 'redux-logger';
import { App } from './components';

import retax from '../src/client';

retax.config({
  client: {
    keepInitialState: false,
  },
  router: {
    root: <Route path="/" component={App} />,
  },
  store: {
    middlewares: [
      createLogger(),
    ],
  },
});

const root = document.getElementById('root');

retax.bootstrap(root);

console.log(retax);
