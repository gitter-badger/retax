import kernel from '../di/entry';

import { componentsModule, ACTIONS_CREATOR_CONSTRUCTOR, API_CONSTRUCTOR, ANNOTATOR } from './inversify';
import { AbstractActionsCreator as AbstractActionsCreatorClass } from './actionsCreator';
import { AbstractApi as AbstractApiClass } from './api';
import { IAnnotator } from './annotator';

kernel.load(componentsModule);

export const AbstractApi = kernel.get<typeof AbstractApiClass>(API_CONSTRUCTOR);
export const AbstractActionsCreator = kernel.get<typeof AbstractActionsCreatorClass>(ACTIONS_CREATOR_CONSTRUCTOR);
export const annotator = kernel.get<IAnnotator>(ANNOTATOR);
