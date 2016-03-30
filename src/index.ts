import 'reflect-metadata';

import { Kernel } from 'inversify';

import { kernelModule, IInjector } from './kernel';
import { serverModule, IServerBoostrapper } from './server';
import { clientModule, IClientBootstrapper } from './client';
import { apiModule, AApi } from './api';
import { internalModule } from './retax';

const kernel = new Kernel({
  modules: [kernelModule, apiModule, clientModule, serverModule, internalModule],
});

export const retax = kernel.get<IClientBootstrapper>('ClientBootstrapper');
export const retaxMiddleware = kernel.get<IServerBoostrapper>('ServerBootstrapper');
export const AbstractApi = kernel.get<typeof AApi>('AbstractApiConstructor');
export const injector = kernel.get<IInjector>('Injector');
