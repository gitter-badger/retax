import { IInitializable } from '../../mediator';
import { IImmutableState } from '../../stateProxies';

import { IAction } from '../../../utils';

export interface ICreateStoreConfig {
  initialState: IImmutableState;
  history: HistoryModule.History;
  middlewares: Redux.Middleware[];
  storeEnhancers: Function[];
  rootReducer: Redux.Reducer;
}

export interface IReduxFacade extends IInitializable<IImmutableState, Redux.Store> {
  store: Redux.Store;

  getAuthToken(): string;
  setAuthToken(token: string): IAction<string, void>;
  dispatch<P, M>(action: IAction<P, M>): IAction<P, M>;
}
