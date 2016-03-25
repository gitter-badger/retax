import { IBootstrapper } from './Bootstrapper';
import { IMiddlewareOptions } from '../../optionsReaders';
import { IRetaxMiddleware } from '../../middleware';

export interface IMiddlewareBoostrapper extends IBootstrapper<IMiddlewareOptions, void, IRetaxMiddleware> {}
