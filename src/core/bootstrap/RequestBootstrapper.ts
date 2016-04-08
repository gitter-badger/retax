import { injectable, inject } from 'inversify';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'react-router';

import { IRequestBootstrapConfig, IRequestBootstrapper } from './interfaces';

import { IRetaxConfigProxy } from '../configProxy';
import { IRetaxConfig } from '../configStores';
import { IStateProxy } from '../stateProxies';
import { IRequestCookieProxy } from '../cookieProxies';
import { IReduxFacade } from '../redux';
import { IJSXBuilder } from '../JSXBuilders';
import { IReactRouterFacade } from '../reactRouter';

import {
  RETAX_CONFIG_PROXY,
  REQUEST_STATE_PROXY,
  REQUEST_COOKIE_PROXY,
  REDUX_FACADE,
  SERVER_BUILDER,
  REACT_ROUTER_FACADE,
} from '../inversify';

@injectable()
export default class RequestBootstrapper implements IRequestBootstrapper {
  constructor(
    @inject(RETAX_CONFIG_PROXY) private _configProxy: IRetaxConfigProxy,
    @inject(REQUEST_STATE_PROXY) private _stateProxy: IStateProxy,
    @inject(REQUEST_COOKIE_PROXY) private _cookieProxy: IRequestCookieProxy,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(SERVER_BUILDER) private _JSXBuilder: IJSXBuilder,
    @inject(REACT_ROUTER_FACADE) private _reactRouterFacade: IReactRouterFacade
  ) {}

  public config(config: IRetaxConfig): void {
    this._configProxy.config = config;
  }

  public async bootstrap({ kernel, req, isomorphicTools }: IRequestBootstrapConfig): Promise<string> {
    // retrieve the auth token from cookies
    const authToken = this._cookieProxy.getAuthToken(req.cookies);

    // get initialState
    const initialState = await this._stateProxy.get();

    // history
    const history = createMemoryHistory();
    const location = history.createLocation(req.originalUrl);
    history.replace(location);

    // initialize Redux store
    const store = this._reduxFacade.connectRedux(initialState, history);
    this._reduxFacade.authToken = authToken;

    const { router } = this._configProxy.evaluateConfig(store, req.header('user-agent'));

    // route matching
    const renderProps = await this._reactRouterFacade.resolveRoute({
      store,
      history,
      routes: router.static,
    });

    // build the app
    const app = this._JSXBuilder.build({
      store,
      kernel,
      renderProps,
      isomorphicTools,
    });

    const markup = renderToString(app);

    return markup;
  }
}
