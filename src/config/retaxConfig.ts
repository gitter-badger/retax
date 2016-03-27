import { IRetaxConfig } from './interfaces';

const retaxConfig: IRetaxConfig = {
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
