import { IReducersMap, IReducer, IAction } from './interfaces';

export default function reducerFactory<S>(initialState: S, handlers: IReducersMap<S>): IReducer<S, any, any> {
  return function reducer(state: S = initialState, action: IAction<any, any>): S {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}
