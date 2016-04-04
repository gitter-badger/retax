import 'reflect-metadata';

import { Kernel } from 'inversify';

import { kernelModule } from './kernel';
import { serverModule, IServerBoostrapper, ServerBootstrapper } from './server';
import { clientModule, IClientBootstrapper, ClientBootstrapper } from './client';
import { annotationsModule, Annotator, IAnnotator } from './annotations';
import {
  componentsModule,
  AbstractApi as AbstractApiClass,
  AbstractActionsCreator as AbstractActionsCreatorClass,
} from './components';

import { internalModule } from './retax';

const kernel = new Kernel();
kernel.load(kernelModule, annotationsModule, componentsModule, clientModule, serverModule, internalModule);

export const retax = kernel.get<IClientBootstrapper>(ClientBootstrapper);
export const retaxMiddleware = kernel.get<IServerBoostrapper>(ServerBootstrapper);
export const AbstractApi = kernel.get<typeof AbstractApiClass>('AbstractApiConstructor');
export const AbstractActionsCreator = kernel.get<typeof AbstractActionsCreatorClass>('AbstractActionsCreatorConstructor');
export const annotator = kernel.get<IAnnotator>(Annotator);

