import kernel from '../di/entry';

import { componentsModule, ACTIONS_CREATOR_CONSTRUCTOR, API_CONSTRUCTOR, ANNOTATOR, LIFECYCLE_MANAGER_CONSTRUCTOR } from './inversify';
import { AbstractActionsCreator as AbstractActionsCreatorClass } from './actionsCreator';
import { AbstractApi as AbstractApiClass } from './api';
import { AbstractLifecycleManager as AbstractLifecycleManagerClass } from './lifecycle';
import { IAnnotator } from './annotator';

kernel.load(componentsModule);

export const AbstractApi = kernel.get<typeof AbstractApiClass>(API_CONSTRUCTOR);
export const AbstractActionsCreator = kernel.get<typeof AbstractActionsCreatorClass>(ACTIONS_CREATOR_CONSTRUCTOR);
export const AbstractLifecycleManager = kernel.get<typeof AbstractLifecycleManagerClass>(LIFECYCLE_MANAGER_CONSTRUCTOR);
export const annotator = kernel.get<IAnnotator>(ANNOTATOR);
