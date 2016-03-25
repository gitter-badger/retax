import { inject } from 'inversify';
import { browserHistory } from 'react-router';

import { IDomBootstrapper } from './interfaces';

import { IRetaxConfigProxy } from '../configProxies';
import { IStateProxy } from '../stateProxies';
import { ICookieProxy } from '../cookieProxies';
import { IReduxFacade } from '../redux';
import { IRenderer } from '../renderers';
import { IRetaxConfig } from '../config';

@inject('RetaxConfigProxy', 'StateProxy', 'CookieProxy', 'ReduxFacade', 'Renderer')
export default class DomBootstrapper implements IDomBootstrapper {
  constructor(
    private _configProxy: IRetaxConfigProxy,
    private _stateProxy: IStateProxy,
    private _cookieProxy: ICookieProxy,
    private _reduxFacade: IReduxFacade,
    private _renderer: IRenderer
  ) {}

  public config(config: IRetaxConfig): void {
    this._configProxy.config = config;
  }

  public async bootstrap(element: Element): Promise<void> {
    // retrieve the auth token
    const authToken = this._cookieProxy.getAuthToken();

    // read initial state
    const initialState = await this._stateProxy.read();

    // initialize Redux store
    const store = this._reduxFacade.connectRedux(initialState, browserHistory);
    this._reduxFacade.setAuthToken(authToken);

    const { router } = this._configProxy.evaluateConfig(store);

    // render the app
    this._renderer.render({
      history: browserHistory,
      mountPoint: element,
      routes: router.static,
      store,
    });
  }
}
