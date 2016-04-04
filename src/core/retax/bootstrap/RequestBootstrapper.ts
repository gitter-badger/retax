import { injectable } from 'inversify';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'react-router';

import { IRequestBootstrapConfig } from './interfaces';

import { ABootstrapper } from '../../utils/bootstrap';
import { IRetaxConfigProxy, RetaxConfigProxy } from '../configProxy';
import { IRetaxConfig } from '../config';
import { IStateProxy, RequestStateProxy } from '../stateProxies';
import { IRequestCookieProxy, RequestCookieProxy } from '../cookieProxies';
import { IReduxFacade, ReduxFacade } from '../redux';
import { IJSXBuilder, ServerBuilder } from '../JSXBuilders';
import { IReactRouterFacade, ReactRouterFacade } from '../reactRouter';

@injectable(RetaxConfigProxy, RequestStateProxy, RequestCookieProxy, ReduxFacade, ServerBuilder, ReactRouterFacade)
export default class RequestBootstrapper extends ABootstrapper<IRetaxConfig, IRequestBootstrapConfig, Promise<string>> {
  constructor(
    private _configProxy: IRetaxConfigProxy,
    private _stateProxy: IStateProxy,
    private _cookieProxy: IRequestCookieProxy,
    private _reduxFacade: IReduxFacade,
    private _JSXBuilder: IJSXBuilder,
    private _reactRouterFacade: IReactRouterFacade
  ) {
    super();
  }

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
      kernel,
      renderProps,
      isomorphicTools,
    });

    const markup = renderToString(app);

    return markup;
  }
}
