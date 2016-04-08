import 'reflect-metadata';

import { Kernel } from 'inversify';

import { clientModule, IClientBootstrapper, CLIENT_BOOTSTRAPPER } from './client';
import { serverModule, IServerBootstrapper, SERVER_BOOTSTRAPPER } from './server';
import {
  componentsModule,
  AbstractApi as AbstractApiClass, API_CONSTRUCTOR,
  AbstractActionsCreator as AbstractActionsCreatorClass, ACTIONS_CREATOR_CONSTRUCTOR,
  IAnnotator, ANNOTATOR,
} from './components';
import { diModule } from './di';

const kernel = new Kernel();

kernel.load(clientModule, serverModule, componentsModule, diModule);

export const retax = kernel.get<IClientBootstrapper>(CLIENT_BOOTSTRAPPER);
export const retaxMiddleware = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);
export const AbstractApi = kernel.get<typeof AbstractApiClass>(API_CONSTRUCTOR);
export const AbstractActionsCreator = kernel.get<typeof AbstractActionsCreatorClass>(ACTIONS_CREATOR_CONSTRUCTOR);
export const annotator = kernel.get<IAnnotator>(ANNOTATOR);
