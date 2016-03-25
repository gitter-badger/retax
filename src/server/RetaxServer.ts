import 'reflect-metadata';
import kernel from './kernel';

import { IMiddlewareBoostrapper } from '../bootstrap';

const middlewareBootstrapper = kernel.get<IMiddlewareBoostrapper>('MiddlewareBootstrapper');

export default middlewareBootstrapper;
