import * as React from 'react';

import {
  IUserServiceConstructor,
  IApiServiceRuntimeConfig, IApiServiceConstructor,
  IActionsCreatorServiceConstructor,
} from '../../../di';
import { RetaxConsumer } from '../../../core';

export interface IEnhancer {
  extendApi(
    Target: IApiServiceConstructor,
    config: IApiServiceRuntimeConfig
  ): IApiServiceConstructor;

  extendActionsCreator(
    Target: IActionsCreatorServiceConstructor,
    keys: string[],
    servicesId: Symbol
  ): IActionsCreatorServiceConstructor;

  extendComponent(
    ComposedComponent: React.ComponentClass<any>,
    keys: string[],
    servicesId: Symbol
  ): typeof RetaxConsumer;
}

export interface ISplitEntriesReturn {
  keys: string[];
  values: IUserServiceConstructor[];
}
