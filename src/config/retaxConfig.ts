import { IRetaxConfig } from './interfaces';

const retaxConfig: IRetaxConfig = {
  api: {
    authHeaderName: 'auth_token',
    baseUrl: '',
    routes: {},
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

export default retaxConfig;
