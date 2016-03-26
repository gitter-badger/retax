import { inject } from 'inversify';

import { IInternalConfig } from '../config';
import { IConfigStore } from '../configStore';

import { IServerCookieProxy, Cookies } from './interfaces';

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
