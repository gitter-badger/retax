import { injectable, inject } from 'inversify';

import { ICookieProxy } from './interfaces';

import { IInternalConfig } from '../configStores';
import { IContext } from '../context';
import { IConfigStore } from '../../utils';

import { INTERNAL_CONFIG_STORE, CONTEXT } from '../inversify';

@injectable()
export default class RequestCookieProxy implements ICookieProxy {

  constructor(
    @inject(INTERNAL_CONFIG_STORE) private _store: IConfigStore<IInternalConfig>,
    @inject(CONTEXT) private _context: IContext
  ) {}

  get authToken(): string {
    return this._readAuthToken();
  }

  set authToken(token: string) {
    this._setAuthToken(token);
  }

  public deleteAuthToken(): void {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    this._context.request.res.cookie(COOKIE_AUTH_TOKEN_KEY, undefined);
  }

  private _readAuthToken(): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    return this._context.request.req.cookies[COOKIE_AUTH_TOKEN_KEY];
  }

  private _setAuthToken(token: string): void {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;

    this._context.request.res.cookie(COOKIE_AUTH_TOKEN_KEY, token);
  }
}
