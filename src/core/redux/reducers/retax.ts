import { Map } from 'immutable';

import { IRetaxState } from './interfaces';

import { TSetAuthTokenPayload } from '../actionsCreators';
import { SET_AUTH_TOKEN, REMOVE_AUTH_TOKEN } from '../constants';

import { reducerFactory, IReducer, IAction } from '../../../utils';

function getInitialState(): IRetaxState {
  return Map<string, string>({
    authToken: undefined,
  });
}

const retaxReducer: IReducer<IRetaxState, any, any> = reducerFactory(
  getInitialState(),
  {
    [SET_AUTH_TOKEN](state: IRetaxState, action: IAction<TSetAuthTokenPayload, void>): IRetaxState {
      return state.set('authToken', action.payload);
    },

    [REMOVE_AUTH_TOKEN](state: IRetaxState, action: IAction<void, void>): IRetaxState {
      return state.remove('authToken');
    },
  }
);

export default retaxReducer;
