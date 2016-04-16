import { injectable } from 'inversify';

import { IInternalConfig } from './interfaces';

import { ConfigStore } from '../../utils';

export const initialConfig: IInternalConfig = {
  COOKIE_AUTH_TOKEN_KEY: 'auth_token',
  INITIAL_STATE_KEY: '__INITIAL_STATE__',
};

@injectable()
export default class InternalConfigStore extends ConfigStore<IInternalConfig> {
  constructor() {
    super();
    this.config = initialConfig;
  }
}
