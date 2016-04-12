import { TSetAuthTokenPayload } from './interfaces';

import { SET_AUTH_TOKEN } from '../constants';
import { actionsCreatorFactory, IActionCreator, IAction } from '../../../utils';

export function isSetAuthTokenAction(a: IAction<any, any>): a is IAction<TSetAuthTokenPayload, void> {
  return a.type === SET_AUTH_TOKEN;
}

export const setAuthToken: IActionCreator<TSetAuthTokenPayload, void> =
  actionsCreatorFactory<TSetAuthTokenPayload, void>(SET_AUTH_TOKEN);
