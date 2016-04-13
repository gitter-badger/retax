import { injectable, inject } from 'inversify';
import * as Cookie from 'js-cookie';

import { ICookieProxy } from './interfaces';

import { IInternalConfig } from '../configStores';
import { IConfigStore } from '../../utils';

import { INTERNAL_CONFIG_STORE } from '../inversify';

@injectable()
export default class DomCookieProxy implements ICookieProxy {
  constructor(
    @inject(INTERNAL_CONFIG_STORE) private _store: IConfigStore<IInternalConfig>
  ) {}

  get authToken(): string {
    return this._readAuthToken();
  }

  set authToken(token: string) {
    this._setAuthToken(token);
  }

  public deleteAuthToken(): void {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    Cookie.remove(COOKIE_AUTH_TOKEN_KEY);
  }

  private _setAuthToken(token: string): void {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    Cookie.set(COOKIE_AUTH_TOKEN_KEY, token, { expires: 1 });
  }

  private _readAuthToken(): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    return Cookie.get(COOKIE_AUTH_TOKEN_KEY);
  }
}
