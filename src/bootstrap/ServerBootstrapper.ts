import { inject } from 'inversify';
import { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'react-router';

import { IServerBootstrapper } from './interfaces';
import { IRetaxConfigProxy } from '../configProxies';
import { IRetaxConfig } from '../config';
import { IStateProxy } from '../stateProxies';
import { IServerCookieProxy } from '../cookieProxies';
import { IReduxFacade } from '../redux';
import { IJSXBuilder } from '../JSXBuilders';
import { IReactRouterFacade } from '../reactRouter';

@inject('RetaxConfigProxy', 'StateProxy', 'CookieProxy', 'ReduxFacade', 'JSXBuilder', 'ReactRouterFacade')
export default class ServerBootstrapper implements IServerBootstrapper {
  constructor(
    private _configProxy: IRetaxConfigProxy,
    private _stateProxy: IStateProxy,
    private _cookieProxy: IServerCookieProxy,
    private _reduxFacade: IReduxFacade,
    private _JSXBuilder: IJSXBuilder,
    private _reactRouterFacade: IReactRouterFacade
  ) {}

  public config(config: IRetaxConfig): void {
    this._configProxy.config = config;
  }

  public async bootstrap(req: Request): Promise<string> {
    // retrieve the auth token from cookies
    const authToken = this._cookieProxy.getAuthToken(req.cookies);

    // get initialState
    const initialState = await this._stateProxy.get();

    // history
    const history = createMemoryHistory();

    // initialize Redux store
    const store = this._reduxFacade.connectRedux(initialState, history);
    this._reduxFacade.authToken = authToken;

    const { router } = this._configProxy.evaluateConfig(store, req.header('user-agent'));

    // route matching
    const location = history.createLocation(req.originalUrl);
    const { renderProps } = await this._reactRouterFacade.match({
      history,
      routes: router.static,
      location,
    });

    // build the app
    const app = this._JSXBuilder.build({
      store,
      renderProps,
    });

    const markup = renderToString(app);

    return markup;
  }
}
