import { createAction } from 'redux-actions';

import { ISetAuthTokenPayload } from './interfaces';
import { SET_AUTH_TOKEN } from '../constants';

export const setAuthToken = createAction<ISetAuthTokenPayload>(SET_AUTH_TOKEN);
