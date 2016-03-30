import { inject } from 'inversify';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import { ABootstrapper } from '../../utils/bootstrap';

import { IRetaxConfigProxy } from '../configProxy';
import { IStateProxy } from '../stateProxies';
import { ICookieProxy } from '../cookieProxies';
import { IReduxFacade } from '../redux';
import { IJSXBuilder } from '../JSXBuilders';
import { IRetaxConfig } from '../config';
import { IReactRouterFacade } from '../reactRouter';

@inject('RetaxConfigProxy', 'DomStateProxy', 'DomCookieProxy', 'ReduxFacade', 'ClientJSXBuilder', 'ReactRouterFacade')
export default class DomBootstrapper extends ABootstrapper<IRetaxConfig, Element, Promise<void>> {
  constructor(
    private _configProxy: IRetaxConfigProxy,
    private _stateProxy: IStateProxy,
    private _cookieProxy: ICookieProxy,
    private _reduxFacade: IReduxFacade,
    private _JSXBuilder: IJSXBuilder,
    private _reactRouterFacade: IReactRouterFacade
  ) {
    super();
  }

  public config(config: IRetaxConfig): void {
    this._configProxy.config = config;
  }

  public async bootstrap(element: Element): Promise<void> {
    // retrieve the auth token from cookies
    const authToken = this._cookieProxy.getAuthToken();

    // get initialState
    const initialState = await this._stateProxy.get();

    // history
    const history = browserHistory;

    // initialize Redux store
    const store = this._reduxFacade.connectRedux(initialState, history);
    this._reduxFacade.authToken = authToken;

    const { router } = this._configProxy.evaluateConfig(store, navigator.userAgent);

    // route matching
    const location = history.createLocation(window.location);
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

    // render the app
    render(app, element);
  }
}
