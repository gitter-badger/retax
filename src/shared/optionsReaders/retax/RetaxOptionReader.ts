import { IRetaxOptionReader, IRetaxOptions } from './interfaces';

export default class RetaxOptionReader implements IRetaxOptionReader {
  private static defaultOptions: IRetaxOptions = {
    client: {
      keepInitialState: false,
    },
    router: {
      root: {},
    },
    server: {
      isomorphicTools: undefined,
      serverRendering: true,
    },
    store: {
      initialState: {},
      middlewares: [],
      nonImmutableKeys: ['routing'],
      reducers: undefined,
      storeEnchancers: [],
    },
  };

  private _options: IRetaxOptions;

  get config(): IRetaxOptions {
    return this._options;
  }

  public read(options: IRetaxOptions): IRetaxOptions {
    this._options = {};

    for (const key in options) {
      if (options.hasOwnProperty(key) && (key in RetaxOptionReader.defaultOptions)) {
        this._options[key] = Object.assign({}, RetaxOptionReader.defaultOptions[key], options[key]);
      }
    }

    return this._options;
  }
}
