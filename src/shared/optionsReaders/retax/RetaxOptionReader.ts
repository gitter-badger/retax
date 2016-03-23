import { IRetaxOptionReader, IRetaxOptions } from './interfaces';

export default class RetaxOptionReader implements IRetaxOptionReader {
  private static defaultOptions: IRetaxOptions = {
    client: {
      keepInitialState: false,
    },
    router: {
      routes: {},
    },
    server: {
      isomorphicTools: {},
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

  public read(option: IRetaxOptions): IRetaxOptions {
    this._options = Object.assign(RetaxOptionReader.defaultOptions, option);
    return this._options;
  }
}
