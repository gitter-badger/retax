import { IAction } from './actionsCreatorFactory';

export interface IReducer<S, P, M> {
  (state: S, action: IAction<P, M>): S;
}

export interface IReducersMap<S> extends HashMap<IReducer<S, any, any>> {}
