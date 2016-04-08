import { injectable, inject } from 'inversify';
import * as Cookie from 'js-cookie';

import { IDomCookieProxy } from './interfaces';

import { IInternalConfig } from '../configStores';
import { IConfigStore } from '../../utils';

import { INTERNAL_CONFIG_STORE } from '../inversify';

@injectable()
export default class DomCookieProxy implements IDomCookieProxy {
  constructor(
    @inject(INTERNAL_CONFIG_STORE) private _store: IConfigStore<IInternalConfig>
  ) {}

  public getAuthToken(): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;
    return Cookie.get(COOKIE_AUTH_TOKEN_KEY);
  }
}
