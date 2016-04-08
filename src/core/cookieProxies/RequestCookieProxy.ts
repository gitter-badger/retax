import { injectable, inject } from 'inversify';

import { IRequestCookieProxy, Cookies } from './interfaces';

import { IInternalConfig } from '../configStores';
import { IConfigStore } from '../../utils';

import { INTERNAL_CONFIG_STORE } from '../inversify';

@injectable()
export default class RequestCookieProxy implements IRequestCookieProxy {
  constructor(
    @inject(INTERNAL_CONFIG_STORE) private _store: IConfigStore<IInternalConfig>
  ) {}

  public getAuthToken(cookies: Cookies): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    return cookies[COOKIE_AUTH_TOKEN_KEY];
  }
}
