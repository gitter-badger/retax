# Retax
[![Build Status][travis-badge]][travis-link]
[![Version][version-badge]][version-link]
[![codecov.io][codecov-badge]][codecov-link]

This project is in **ALPHA** state.
The core APIs are stable but untested yet.
The optionnal modules APIs are unstable and untested.

Retax helps you bootstrap your **universal react / redux** application.
It also comes with a set of **optionnal** opinionated helpers to structure and reduce your application code.

You could look at an (HUGE) example running with retax [here][seed].

## What is Retax and what does it solve?
### Centralize all the stuff that is not needed by the developper
How many times developpers of a react / redux app should edit the app configuration files (like `createReduxStore.js`, `clientEntry.js`, `serverRenderingMiddleware.js`, etc...)?
Only once. But in practice. this is not really like that...
* If `react-router` has an new update with a change in its API, you will have to edit the `clientEntry.js`, maybe the `serverRenderingMiddleware.js`, and others...
  And what about `react-router-redux`? Will it still be compatible?
* If `redux` has a new update and expose a new function that create the store more efficiently, you surely want to have this.
* If `react` has a new... etc..

You got it? It could be a serious pain to update the structure of the app. (the more you have external dependencies, the harder it is!)
And we have not talking about creating the **real** app yet...


Retax helps you with this. You have just to give it a configuration file and it will take care of everything.
All its bootstrapping process is highly customizable if you need it.

Here is a non exhaustive list of retax features:

* Support **universal** javascript (via `retaxExpressMiddleware`).
* Initialize your **redux** store
  * You could provide your redux middlewares
  * You also could provide your store enhancers
  * And obviously, your reducers!
* Initialize **react-router**
  * Support plain JS object route or JSX route.
* Support out-of-the-box code splitting (useful if you are using `require.ensure` into your **react-router** routes)
* Initialize **react-router-redux**
* Render the **react** app
  * you could append JSX elements in the render loop, useful if your want to include `<DevTools />`
* Support lifecycle hooks to customize and inject data during the bootstrapping process. For instance you could:
  * Prefetch initial state before doing the route matching
  * Prefetch components data once the route matching is done.
  * Do something whenever the history has changed.

After the bootstrapping, you could still use all modules exposed by `react`, `react-router`, `redux`, `react-router-redux`, etc...
(Eg. `<Link />`, `bindActionCreators`, ...)


### **OPTIONNAL** Help you structure your app and reduce your boilerplate code
I am considering to put these optionnal modules into another npm package because, as I said, they are totally optionnal and the **core** doesn't rely on it.
They don't really belong to this package.

#### API
##### Initial Problem
You want to do an ajax call to an API but you have to be authentified. Your auth token is in your `session reducer`.
Each time you call your `doAjaxCall` actions creator, your have to:
* read the store state
* retrieve the auth token
* pass it to your API Connector class

So much boilerplate code!

##### Retax Solution
Retax API module helps you create an API class (with base methods, GET, POST, DELETE, PUT (can be extended)) and will inject into it the current auth token.
This API class can later be injected into an Actions Creator.


#### Actions Creator
Create an Actions Creator class with the possibility to inject into it other Actions Creator and APIs.

#### Retax Component
Create a React component with the possibility to inject into it Actions Creators.


## Getting started
```
npm install --save retax
```

```
"peerDependencies": {
  "cookie-parser": "^1.4.1",
  "immutable": "^3.8.0",
  "react-dom": "^0.14.0 || ^15.0.0-0",
  "react-helmet": "^3.0.1",
  "react-redux": "^4.4.5",
  "react-router-redux": "^4.0.2",
  "react-router": "^2.2.4",
  "react": "^0.14.0 || ^15.0.0-0",
  "redux": "^3.4.0",
  "webpack-isomorphic-tools": "^2.2.26"
}
```

### Retax

#### Configuration File

```js

import middlewares from 'middlewares'; // array of redux middlewares
import * as reducers from 'reducers'; // map of reducers
import rootRoute from 'routes'; // react-router route

class LifecycleManager {
  willResolveRoute(authToken) { return Promise.resolve(); } // optionnal
  didResolveRoute(renderProps) { return Promise.resolve(); } // optionnal
  historyDidChanged(location, renderProps) { } // optionnal
}

export default {
  lifecycle: LifecycleManager, // optionnal
  react: { // optionnal
    appendChild: <div>Hello World! I will be append bellow the react app!</div>,
  },
  router: {
    static: rootRoute,
  },
  store: {
    middlewares,
    reducers,
    storeEnhancers: [], //array of store enhancers (eg. [DevTools.instrument()])
  },
};

```

#### Client entry

```js
import { retax } from 'retax';
import retaxConfig from './retax.config';

retax.config(retaxConfig);

const rootElement = document.getElementById('root');

retax.bootstrap(rootElement);

```

#### **OPTIONNAL** Server entry

At the moment, retax relies on `webpack-isomorphic-tools` to inject assets files into the rendered page.
I am considering to use something easier for the end user.


```js
import Express from 'express';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import cookieParser from 'cookie-parser';
import isomorphicConfig from './config/isomorphicConfig';

import { retaxMiddleware } from 'retax';
import retaxConfig from './retax.config';

const isomorphicTools = new WebpackIsomorphicTools(isomorphicConfig); // an exemple of isomorphicConfig is here https://goo.gl/1WxQoC

isomorphicTools.server(__dirname).then(() => {
 const app = new Express();

  app.use(cookieParser());

  app.use(retaxMiddleware({
    serverRendering: true,
    isomorphicTools: global.webpackIsomorphicTools,
    retaxConfig,
  }));

  app.listen(3000);
});

```

### **OPTIONNAL AND UNSTABLE** Helpers

These APIs are **NOT STABLE**. This is more a proof of concept. I like the structure but I think the synthax is not good. It is too verbose.
Suggestions are more than welcome.

#### Create an API
User API: `apis/user`

```js
import { annotator, AbstractApi } from 'retax';

@annotator.Api({
  baseUrl: 'http://localhost:8080',
  routes: {
    users: '/user',
  },
})
export default class UserApi extends AbstractApi {
  getCurrent() {
    return this.get({ url: `${this.routes.users}/me` });
  }
}

```

#### Create an Actions creator

User Actions Creator: `actionsCreators/user`

```js
import { actionsCreatorFactory, annotator, AbstractActionsCreator } from 'retax';

import UserApi from 'apis/user';
import { GET_CURRENT_USER } from 'constants/actions';
import ThemeActionsCreator from 'actions/theme';

@annotator.ActionsCreator({
  apis: {
    userApi: UserApi,
  },
  actionsCreators: {
    theme: ThemeActionsCreator,
  },
})
export default class UserActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  fetchCurrentUser() {
    return async dispatch => {
      const { setAdminTheme, setUserTheme } = this.actionsCreators.theme;

      const res = await this.apis.userApi.getCurrent();

      dispatch(res.isAdmin ? setAdminTheme() : setUserTheme());
    }
  }
}
```

#### Create Retax Component
```js
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annotator } from 'retax';

import UserActionsCreator from 'actionsCreators/user';

function mapDispatchToProps(dispatch, props) {
  const { userActions } = props;

  return bindActionCreators({
    ...userActions.export(), // get all methods of UserActionsCreator annotated with @annotator.action()
  }, dispatch);
}

@annotator.RetaxComponent({
  actionsCreators: {
    userActions: UserActionsCreator,
  },
})
@connect(() => {}, mapDispatchToProps)
export default class SigninPage extends Component {
  static propTypes = {
    fetchCurrentUser: PropTypes.func,
  };

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

```

## FAQ
### I don't understand how this library is built
Check [builder][builder-link] and [builder-ts-library][builder-ts-library-link]


## Typescript support
This project is shipped with typescript typings.
If you are using typescript@^1.6, you don't have to do anything, it will detect the definition types automatically.

## Contributing
### Install the project

```
git clone
nvm use
npm install
npm run typings
npm start
```


[travis-badge]: https://travis-ci.org/hourliert/retax.svg?branch=develop
[travis-link]: https://travis-ci.org/hourliert/retax
[version-badge]: https://badge.fury.io/js/retax.svg
[version-link]: https://badge.fury.io/js/retax
[codecov-badge]: https://codecov.io/github/hourliert/retax/coverage.svg?branch=develop
[codecov-link]: https://codecov.io/github/hourliert/retax?branch=develop
[seed]: https://github.com/hourliert/react-seed
[builder-link]: http://builder.formidable.com/
[builder-ts-library-link]: https://github.com/hourliert/builder-ts-library
