import * as React from 'react';
import { IKernel } from 'inversify';

import {
  IUserServiceConstructor, IInjectableUserServiceMap,
  IApiServiceRuntimeConfig, IApiServiceConstructor,
  IActionsCreatorServiceConstructor,
} from '../../../kernel';
import { RetaxConsumer } from '../../../retax';

export interface IEnhancedComponentContextType {
  kernel: IKernel;
}

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
