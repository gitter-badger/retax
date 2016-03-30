import { inject } from 'inversify';

import { IServerCookieProxy, Cookies } from './interfaces';

import { IInternalConfig } from '../config';
import { IConfigStore } from '../../utils';

@inject('InternalConfigStore')
export default class ServerCookieProxy implements IServerCookieProxy {
  constructor(
    private _store: IConfigStore<IInternalConfig>
  ) {}

  public getAuthToken(cookies: Cookies): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    return cookies[COOKIE_AUTH_TOKEN_KEY];
  }
}
