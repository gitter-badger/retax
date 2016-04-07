import { injectable, inject } from 'inversify';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { replace } from 'react-router-redux';

import { IDomBootstrapConfig } from './interfaces';

import { ABootstrapper } from '../../../utils';

import { IRetaxConfigProxy, RETAX_CONFIG_PROXY } from '../configProxy';
import { IStateProxy, DOM_STATE_PROXY } from '../stateProxies';
import { ICookieProxy, DOM_COOKIE_PROXY } from '../cookieProxies';
import { IReduxFacade, REDUX_FACADE } from '../redux';
import { IJSXBuilder, CLIENT_BUILDER } from '../JSXBuilders';
import { IRetaxConfig } from '../config';
import { IReactRouterFacade, REACT_ROUTER_FACADE } from '../reactRouter';

@injectable()
export default class DomBootstrapper extends ABootstrapper<IRetaxConfig, IDomBootstrapConfig, Promise<void>> {
  constructor(
    @inject(RETAX_CONFIG_PROXY) private _configProxy: IRetaxConfigProxy,
    @inject(DOM_STATE_PROXY) private _stateProxy: IStateProxy,
    @inject(DOM_COOKIE_PROXY) private _cookieProxy: ICookieProxy,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(CLIENT_BUILDER) private _JSXBuilder: IJSXBuilder,
    @inject(REACT_ROUTER_FACADE) private _reactRouterFacade: IReactRouterFacade
  ) {
    super();
  }

  public config(config: IRetaxConfig): void {
    this._configProxy.config = config;
  }

  public async bootstrap({ element, kernel }: IDomBootstrapConfig): Promise<void> {
    // retrieve the auth token from cookies
    const authToken = this._cookieProxy.getAuthToken();

    // get initialState
    const initialState = await this._stateProxy.get();

    // history
    const history = browserHistory;
    const location = history.createLocation(window.location);
    history.replace(location);

    // initialize Redux store
    const store = this._reduxFacade.connectRedux(initialState, history);
    this._reduxFacade.authToken = authToken;

    const { router } = this._configProxy.evaluateConfig(store, navigator.userAgent);

    // route matching
    const renderProps = await this._reactRouterFacade.resolveRoute({
      store,
      history,
      routes: router.static,
    });

    // build the app
    const app = this._JSXBuilder.build({
      kernel,
      store,
      renderProps,
    });

    // render the app
    render(app, element);
  }
}
