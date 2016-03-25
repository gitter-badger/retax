import { IImmutableState } from '../../stateReaders';

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
  setAuthToken(token: string): ReduxActions.Action;
  connectRedux(initialState: IImmutableState, history: HistoryModule.History): Redux.Store;
}
