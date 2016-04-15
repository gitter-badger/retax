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
import { IImmutableState } from '../stateProxies';
import { IContext } from '../context';

import { IAction } from '../../utils';

import {
  RETAX_CONFIG_STORE,
  COOKIE_PROXY,
  CONTEXT,
} from '../inversify';

@injectable()
export default class ReduxFacade implements IReduxFacade {
  private _store: Redux.Store;

  constructor(
    @inject(RETAX_CONFIG_STORE) private _configStore: IRetaxConfigStore,
    @inject(COOKIE_PROXY) private _cookieProxy: ICookieProxy,
    @inject(CONTEXT) private _context: IContext
  ) {
  }

  get store(): Redux.Store {
    if (this._store === undefined) {
      throw new Error('The store has not been initialized yet');
    }

    return this._store;
  }

  public getAuthToken(): string {
    const { retax } = this.store.getState();

    return retax.get('authToken');
  }

  public setAuthToken(token: string): IAction<TSetAuthTokenPayload, void> {
    return this.dispatch(setAuthToken(token));
  }

  public dispatch(action: IAction<any, any>): IAction<any, any> {
    return this.store.dispatch(action);
  }

  public initialize(initialState: IImmutableState): Redux.Store {
    // create the store
    this._store = this._initStore(initialState);

    // initialize the store with the current auth token
    this.dispatch(setAuthToken(this._cookieProxy.authToken));

    return this._store;
  }

  private _initStore(initialState: IImmutableState): Redux.Store {
    const { middlewares, reducers, storeEnhancers } = this._configStore.config.store;
    const rootReducer = this._combineReducers(reducers);

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