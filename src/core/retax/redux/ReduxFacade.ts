import { injectable, inject } from 'inversify';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import { IReduxFacade, ICreateStoreConfig } from './interfaces';
import * as internalReducers from './reducers';
import { setAuthToken } from './actionsCreators';

import { IRetaxConfigProxy, RETAX_CONFIG_PROXY } from '../configProxy';
import { IImmutableState } from '../stateProxies';

import { IReducersMap } from '../config';

@injectable()
export default class ReduxFacade implements IReduxFacade {
  private _store: Redux.Store;

  constructor(
    @inject(RETAX_CONFIG_PROXY) private _configProxy: IRetaxConfigProxy
  ) {}

  get reduxStore(): Redux.Store {
    return this._store;
  }

  get authToken(): string {
    const { retax } = this._store.getState();
    return retax.get('authToken');
  }

  set authToken(token: string) {
    this._store.dispatch(setAuthToken(token));
  }

  public connectRedux(initialState: IImmutableState, history: HistoryModule.History): Redux.Store {
    const { middlewares, reducers, storeEnhancers } = this._configProxy.config.store;
    const rootReducer = this._combineReducers(reducers);

    this._store = this._createStore({
      initialState,
      history,
      rootReducer,
      storeEnhancers,
      middlewares,
    });

    syncHistoryWithStore(history, this._store);

    return this._store;
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
