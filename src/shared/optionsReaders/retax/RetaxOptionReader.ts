import { IRetaxOptionReader, IRetaxOptions } from './interfaces';

export default class RetaxOptionReader implements IRetaxOptionReader {
  static defaultOptions: IRetaxOptions = {
    store: {
      nonImmutableKeys: ['routing'],
      middlewares: [],
      reducers: undefined,
      initialState: {},
    },
    router: {
      routes: {},
    },
    server: {
      serverRendering: true,
      isomorphicTools: {},
    },
    client: {
      keepInitialState: false,
    },
  };

  private _options: IRetaxOptions;

  get config(): IRetaxOptions {
    return this._options;
  }

  read(option: IRetaxOptions) {
    this._options = Object.assign(RetaxOptionReader.defaultOptions, option);
  }
}
