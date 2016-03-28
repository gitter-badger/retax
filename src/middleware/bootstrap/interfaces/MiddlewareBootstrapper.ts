import { IBootstrapper } from '../../../utils';
import { IMiddlewareConfig } from '../../../config';
import { IRetaxMiddleware } from '../../middlewares';

export interface IMiddlewareBoostrapper extends IBootstrapper<
  IMiddlewareConfig,
  void,
  IRetaxMiddleware
> {}
