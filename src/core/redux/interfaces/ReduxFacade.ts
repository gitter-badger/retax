import { IImmutableState } from '../../stateProxies';

export interface ICreateStoreConfig {
  initialState: IImmutableState;
  history: HistoryModule.History;
  middlewares: Redux.Middleware[];
  storeEnhancers: Function[];
  rootReducer: Redux.Reducer;
}

export interface IReduxFacade {
  storePromise: Promise<Redux.Store>;

  getAuthToken(): Promise<string>;
  setAuthToken(token: string): Promise<ReduxActions.Action>;
  dispatch(action: ReduxActions.Action): Promise<ReduxActions.Action>;
}
