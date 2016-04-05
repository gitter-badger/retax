import 'reflect-metadata';

import { Kernel } from 'inversify';

import { clientModule, IClientBootstrapper, CLIENT_BOOTSTRAPPER } from './client';
import { serverModule, IServerBootstrapper, SERVER_BOOTSTRAPPER } from './server';
import {
  componentsModule,
  AbstractApi as AbstractApiClass,
  AbstractActionsCreator as AbstractActionsCreatorClass,
  ABSTRACT_API, ABSTRACT_ACTIONS_CREATPOR,
} from './components';
import { frameworkModule, internalConfigModule, IAnnotator, ANNOTATOR } from './core';

const kernel = new Kernel();

kernel.load(internalConfigModule, frameworkModule, clientModule, serverModule, componentsModule);

export const retax = kernel.get<IClientBootstrapper>(CLIENT_BOOTSTRAPPER);
export const retaxMiddleware = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);
export const AbstractApi = kernel.get<typeof AbstractApiClass>(ABSTRACT_API);
export const AbstractActionsCreator = kernel.get<typeof AbstractActionsCreatorClass>(ABSTRACT_ACTIONS_CREATPOR);
export const annotator = kernel.get<IAnnotator>(ANNOTATOR);
