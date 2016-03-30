import { inject } from 'inversify';

import { IRequestCookieProxy, Cookies } from './interfaces';

import { IInternalConfig } from '../config';
import { IConfigStore } from '../../utils';

@inject('InternalConfigStore')
export default class RequestCookieProxy implements IRequestCookieProxy {
  constructor(
    private _store: IConfigStore<IInternalConfig>
  ) {}

  public getAuthToken(cookies: Cookies): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    return cookies[COOKIE_AUTH_TOKEN_KEY];
  }
}
