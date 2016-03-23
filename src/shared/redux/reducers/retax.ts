import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import { ISetAuthTokenPayload } from '../actionsCreators';
import { SET_AUTH_TOKEN } from '../constants';

export interface IRetaxState extends Immutable.Map<string, any> {}

function getInitialState(): IRetaxState {
  'use strict';

  return fromJS({
    authToken: undefined,
  });
}

export default handleActions({
  [SET_AUTH_TOKEN](state: IRetaxState, action: ReduxActions.Action): IRetaxState {
    const payload: ISetAuthTokenPayload = action.payload;

    return state.set('authToken', payload);
  },
}, getInitialState());
