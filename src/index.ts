import 'reflect-metadata';
import { kernel } from './kernel';

import { IDomBootstrapper } from './retax';
import { IMiddlewareBoostrapper } from './middleware';
import { AApi } from './api';

export const retax = kernel.get<IDomBootstrapper>('DomBootstrapper');
export const retaxMiddleware = kernel.get<IMiddlewareBoostrapper>('MiddlewareBootstrapper');
export const AbstractApi = kernel.get<typeof AApi>('AApi');
