import { IRetaxConfig, IRetaxConfigStore } from './interfaces';

import { createConfigStore } from '../../utils';

export const retaxConfig: IRetaxConfig = {
  api: {
    authHeaderName: 'auth_token',
    baseUrl: '',
  },
  client: {
    keepInitialState: false,
  },
  react: {},
  router: {
    static: {},
  },
  store: {
    initialState: {},
    middlewares: [],
    nonImmutableKeys: ['routing'],
    reducers: undefined,
    storeEnhancers: [],
  },
};

const retaxConfigStore: IRetaxConfigStore = createConfigStore<IRetaxConfig>(retaxConfig);

export default retaxConfigStore;
