import 'reflect-metadata';

import { Kernel } from 'inversify';

import { kernelModule, IInjector, Injector } from './kernel';
import { serverModule, IServerBoostrapper, ServerBootstrapper } from './server';
import { clientModule, IClientBootstrapper, ClientBootstrapper } from './client';
import { apiModule, AApi } from './api';
import { actionsCreatorModule, AActionsCreator} from './actionsCreator';
import { internalModule } from './retax';

const kernel = new Kernel();
kernel.load(kernelModule, apiModule, actionsCreatorModule, clientModule, serverModule, internalModule);

export const retax = kernel.get<IClientBootstrapper>(ClientBootstrapper);
export const retaxMiddleware = kernel.get<IServerBoostrapper>(ServerBootstrapper);
export const AbstractApi = kernel.get<typeof AApi>('AbstractApiConstructor');
export const AbstractActionsCreator = kernel.get<typeof AActionsCreator>('AbstractActionsCreatorConstructor');
export const injector = kernel.get<IInjector>(Injector);
