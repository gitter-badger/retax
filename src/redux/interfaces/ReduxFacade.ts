import { IImmutableState } from '../../stateProxies';

export interface ICreateStoreOptions {
  initialState: IImmutableState;
  history: HistoryModule.History;
  middlewares: Redux.Middleware[];
  storeEnhancers: Function[];
  rootReducer: Redux.Reducer;
}

export interface IReducersMap {
  [key: string]: Function;
}

export interface IReduxFacade {
  reduxStore: Redux.Store;
  authToken: string;
  connectRedux(initialState: IImmutableState, history: HistoryModule.History): Redux.Store;
}
