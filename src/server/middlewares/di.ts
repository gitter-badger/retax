import { IKernel } from 'inversify';

import { IRetaxMiddlewareFactory } from './interfaces';
import StaticMiddlewareFactory from './StaticMiddlewareFactory';
import RenderingMiddlewareFactory from './RenderingMiddlewareFactory';

export const STATIC_MIDDLEWARE_FACTORY = Symbol('StaticMiddlewareFactory');
export const RENDERING_MIDDLEWARE_FACTORY = Symbol('RenderingMiddlewareFactory');

export const MIDDLEWARES = { STATIC_MIDDLEWARE_FACTORY, RENDERING_MIDDLEWARE_FACTORY };

export function staticMiddlewareFactoryModule(kernel: IKernel): void {
  kernel.bind<IRetaxMiddlewareFactory>(STATIC_MIDDLEWARE_FACTORY).to(StaticMiddlewareFactory).inSingletonScope();
}

export function renderingMiddlewareFactoryModule(kernel: IKernel): void {
  kernel.bind<IRetaxMiddlewareFactory>(RENDERING_MIDDLEWARE_FACTORY).to(RenderingMiddlewareFactory).inSingletonScope();
}

export function middlewaresModule(kernel: IKernel): void {
  kernel.load(staticMiddlewareFactoryModule);
  kernel.load(renderingMiddlewareFactoryModule);
}
