import { IMiddlewareOptions } from './interfaces';

import RetaxOptionReader from './RetaxOptionReader';
import OptionReader from './OptionReader';

export default class MiddlewareOptionReader extends OptionReader<IMiddlewareOptions> {
  public static defaultOptions: IMiddlewareOptions = {
    isomorphicTools: undefined,
    retaxOptions: RetaxOptionReader.defaultOptions,
    serverRendering: true,
  };

  constructor() {
    super(MiddlewareOptionReader.defaultOptions);
  }
}
