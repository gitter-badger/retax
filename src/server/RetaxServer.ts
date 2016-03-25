import 'reflect-metadata';
import kernel from './kernel';

import { IBootstrapper } from '../bootstrap';
import { IMiddlewareOptions } from '../optionsReaders';
import { IRetaxMiddleware } from '../middleware';

const middlewareBootstrapper = kernel.get<IBootstrapper<IMiddlewareOptions, void, IRetaxMiddleware>>('MiddlewareBootstrapper');

export default middlewareBootstrapper;
