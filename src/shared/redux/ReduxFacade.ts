import { inject } from 'inversify';

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import { IReduxFacade, IReducersMap, ICreateStoreOptions } from './interfaces';
import * as internalReducers from './reducers';
import { setAuthToken } from './actionsCreators';

import { IRetaxOptionReader } from '../optionsReaders';
import { IImmutableState } from '../stateReaders';

@inject('IRetaxOptionReader')
export default class ReduxFacade implements IReduxFacade {
  private _store: Redux.Store;

  constructor(
    private _optionsReader: IRetaxOptionReader
  ) {}

  get reduxStore(): Redux.Store {
    return this._store;
  }

  public setAuthToken(token: string): ReduxActions.Action {
    return this._store.dispatch(setAuthToken(token));
  }

  public connectRedux(initialState: IImmutableState, history: HistoryModule.History): Redux.Store {
    const { middlewares, reducers, storeEnchancers } = this._optionsReader.config.store;
    const rootReducer = this.combineReducers(reducers);

    this._store = this.createStore({
      initialState,
      history,
      rootReducer,
      storeEnchancers,
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
    const { initialState, history, middlewares = [], storeEnchancers = [], rootReducer } = options;

    const reduxRouterMiddleware = routerMiddleware(history);

    const finalStoreEnhancers = [
      applyMiddleware(...[
        ...middlewares.filter((x: Redux.Middleware) => !!x),
        reduxRouterMiddleware,
      ]),
    ];

    finalStoreEnhancers.push(...storeEnchancers);

    return createStore(
      rootReducer,
      initialState,
      <any>compose(...finalStoreEnhancers)
    );
  }
}
