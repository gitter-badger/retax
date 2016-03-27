import { inject } from 'inversify';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import { IReduxFacade, IReducersMap, ICreateStoreOptions } from './interfaces';
import * as internalReducers from './reducers';
import { setAuthToken } from './actionsCreators';

import { IRetaxConfigProxy } from '../configProxies';
import { IImmutableState } from '../stateProxies';

@inject('RetaxConfigProxy')
export default class ReduxFacade implements IReduxFacade {
  private _store: Redux.Store;

  constructor(
    private _configProxy: IRetaxConfigProxy
  ) {}

  get reduxStore(): Redux.Store {
    return this._store;
  }

  public setAuthToken(token: string): ReduxActions.Action {
    return this._store.dispatch(setAuthToken(token));
  }

  public connectRedux(initialState: IImmutableState, history: HistoryModule.History): Redux.Store {
    const { middlewares, reducers, storeEnhancers } = this._configProxy.config.store;
    const rootReducer = this.combineReducers(reducers);

    this._store = this.createStore({
      initialState,
      history,
      rootReducer,
      storeEnhancers,
      middlewares,
    });

    syncHistoryWithStore(history, this._store);

    return this._store;
  }

  private combineReducers(reducers: IReducersMap): Redux.Reducer {
    return combineReducers(Object.assign({
      routing: routerReducer,
    }, internalReducers, reducers));
  }

  private createStore(options: ICreateStoreOptions): Redux.Store {
    const { initialState, history, middlewares = [], storeEnhancers = [], rootReducer } = options;

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
