import { IRetaxConfig, IRetaxConfigStore } from './interfaces';

import { ConfigStore } from '../../utils';

export const initialConfig: IRetaxConfig = {
  api: {
    authHeaderName: 'auth_token',
    baseUrl: '',
  },
  client: {
    keepInitialState: false,
  },
  lifecycle: undefined,
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

abstract class RetaxConfigStore extends ConfigStore<IRetaxConfig> implements IRetaxConfigStore {
  constructor(userConfig: IRetaxConfig) {
    super();

    this.config = initialConfig;
    this.config = userConfig;
  }

  public abstract evaluateConfig(store: Redux.Store): IRetaxConfig;
}

export default RetaxConfigStore;
