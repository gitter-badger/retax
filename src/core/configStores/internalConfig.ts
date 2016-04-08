import { IInternalConfig, IInternalConfigStore } from './interfaces';

import { createConfigStore } from '../../utils';

export const internalConfig: IInternalConfig = {
  COOKIE_AUTH_TOKEN_KEY: 'auth_token',
  INITIAL_STATE_KEY: '__INITIAL_STATE_KEY__',
};

const internalConfigStore: IInternalConfigStore = createConfigStore<IInternalConfig>(internalConfig);

export default internalConfigStore;
