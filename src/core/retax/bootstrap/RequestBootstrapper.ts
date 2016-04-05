import { injectable, inject } from 'inversify';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'react-router';

import { IRequestBootstrapConfig } from './interfaces';

import { ABootstrapper } from '../../../utils';
import { IRetaxConfigProxy, RETAX_CONFIG_PROXY } from '../configProxy';
import { IRetaxConfig } from '../config';
import { IStateProxy, REQUEST_STATE_PROXY } from '../stateProxies';
import { IRequestCookieProxy, REQUEST_COOKIE_PROXY } from '../cookieProxies';
import { IReduxFacade, REDUX_FACADE } from '../redux';
import { IJSXBuilder, SERVER_BUILDER } from '../JSXBuilders';
import { IReactRouterFacade, REACT_ROUTER_FACADE } from '../reactRouter';

@injectable()
export default class RequestBootstrapper extends ABootstrapper<IRetaxConfig, IRequestBootstrapConfig, Promise<string>> {
  constructor(
    @inject(RETAX_CONFIG_PROXY) private _configProxy: IRetaxConfigProxy,
    @inject(REQUEST_STATE_PROXY) private _stateProxy: IStateProxy,
    @inject(REQUEST_COOKIE_PROXY) private _cookieProxy: IRequestCookieProxy,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(SERVER_BUILDER) private _JSXBuilder: IJSXBuilder,
    @inject(REACT_ROUTER_FACADE) private _reactRouterFacade: IReactRouterFacade
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
