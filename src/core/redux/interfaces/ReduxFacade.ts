import { IImmutableState } from '../../stateProxies';

import { IAction } from '../../../utils';

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
  setAuthToken(token: string): Promise<IAction<string, void>>;
  dispatch<P, M>(action: IAction<P, M>): Promise<IAction<P, M>>;
}
