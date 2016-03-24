import 'reflect-metadata';
import kernel from './kernel';

import { IBootstrapper, IMiddleware } from '../shared/bootstrap';
import { IMiddlewareOptions } from '../shared/optionsReaders';

const middleware = kernel.get<IBootstrapper<IMiddlewareOptions, void, IMiddleware>>('MiddlewareBootstrapper');

/**
 * Wrapper around the instance of MiddlewareCreator
 * This allows the server lib to be exposed as a default function
 */
export default function retaxMiddleware(options: IMiddlewareOptions): IMiddleware {
  middleware.config(options);

  return middleware.bootstrap();
}
