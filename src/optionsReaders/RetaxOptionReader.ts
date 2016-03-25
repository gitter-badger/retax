import { IRetaxOptionReader, IRetaxOptions, IRoute } from './interfaces';

import OptionReader from './OptionReader';

export default class RetaxOptionReader extends OptionReader<IRetaxOptions> implements IRetaxOptionReader {
  public static defaultOptions: IRetaxOptions = {
    client: {
      keepInitialState: false,
    },
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

  constructor() {
    super(RetaxOptionReader.defaultOptions);
  }

  public evaluateRoute(store: Redux.Store): IRoute {
    const { router } = this._options;

    if (router.dynamic) {
      router.static = router.dynamic(store);
    }

    return router.static;
  }
}
