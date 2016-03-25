import { IBootstrapper } from './Bootstrapper';
import { IMiddlewareConfig } from '../../config';
import { IRetaxMiddleware } from '../../middleware';

export interface IMiddlewareBoostrapper extends IBootstrapper<IMiddlewareConfig, void, IRetaxMiddleware> {}
