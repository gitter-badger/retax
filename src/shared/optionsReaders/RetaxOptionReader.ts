import { IRetaxOptions } from './interfaces';

import OptionReader from './OptionReader';

export default class RetaxOptionReader extends OptionReader<IRetaxOptions> {
  public static defaultOptions: IRetaxOptions = {
    client: {
      keepInitialState: false,
    },
    router: {
      root: {},
    },
    store: {
      initialState: {},
      middlewares: [],
      nonImmutableKeys: ['routing'],
      reducers: undefined,
      storeEnchancers: [],
    },
  };

  constructor() {
    super(RetaxOptionReader.defaultOptions);
  }
}
