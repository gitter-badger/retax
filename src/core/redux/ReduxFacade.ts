import { injectable, inject } from 'inversify';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import { IReduxFacade, ICreateStoreConfig } from './interfaces';
import * as internalReducers from './reducers';
import { credentialsMiddleware } from './middlewares';
import { setAuthToken, TSetAuthTokenPayload } from './actionsCreators';

import { IRetaxConfigStore } from '../configStores';
import { IReducersMap } from '../configStores';
import { ICookieProxy } from '../cookieProxies';
import { IStateProxy } from '../stateProxies';
import { IContext } from '../context';

import { IAction } from '../../utils';

import {
  RETAX_CONFIG_STORE,
  COOKIE_PROXY,
  STATE_PROXY,
  CONTEXT,
} from '../inversify';

@injectable()
export default class ReduxFacade implements IReduxFacade {
  private _storePromise: Promise<Redux.Store>;

  constructor(
    @inject(RETAX_CONFIG_STORE) private _configStore: IRetaxConfigStore,
    @inject(COOKIE_PROXY) private _cookieProxy: ICookieProxy,
    @inject(STATE_PROXY) private _stateProxy: IStateProxy,
    @inject(CONTEXT) private _context: IContext
  ) {
    this._storePromise = this._initialize();
    this.setAuthToken(this._cookieProxy.authToken);
  }

  get storePromise(): Promise<Redux.Store> {
    if (this._storePromise === null) {
      throw new Error('The store has not been initialized yet');
    }

    return this._storePromise;
  }

  public async getAuthToken(): Promise<string> {
    const store = await this.storePromise;
    const { retax } = store.getState();

    return retax.get('authToken');
  }

  public setAuthToken(token: string): Promise<IAction<TSetAuthTokenPayload, void>> {
    return this.dispatch(setAuthToken(token));
  }

  public async dispatch(action: IAction<any, any>): Promise<IAction<any, any>> {
    const store = await this.storePromise;

    return store.dispatch(action);
  }

  private async _initialize(): Promise<Redux.Store> {
    const { middlewares, reducers, storeEnhancers } = this._configStore.config.store;
    const rootReducer = this._combineReducers(reducers);

    const initialState = await this._stateProxy.statePromise;

    const store = this._createStore({
      initialState,
      history: this._context.history,
      rootReducer,
      storeEnhancers,
      middlewares,
    });

    syncHistoryWithStore(this._context.history, store);

    return store;
  }

  private _combineReducers(reducers: IReducersMap): Redux.Reducer {
    return combineReducers(Object.assign({
      routing: routerReducer,
    }, internalReducers, reducers));
  }

  private _createStore(config: ICreateStoreConfig): Redux.Store {
    const { initialState, history, middlewares = [], storeEnhancers = [], rootReducer } = config;

    const reduxRouterMiddleware = routerMiddleware(history);

    const finalStoreEnhancers = [
      applyMiddleware(...[
        ...middlewares.filter(x => !!x),
        credentialsMiddleware(this._cookieProxy),
        reduxRouterMiddleware,
      ]),
    ];

    finalStoreEnhancers.push(...storeEnhancers.filter(x => !!x));

    return createStore(
      rootReducer,
      initialState,
      <any>compose(...finalStoreEnhancers)
    );
  }
}
