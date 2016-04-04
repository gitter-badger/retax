import * as React from 'react';
import { IKernel } from 'inversify';

import { IUserServiceConstructor, IInjectableUserServiceMap } from '../../../kernel';
import {
  IApiRuntimeConfig, IApiConstructor, IRoutesMap,
  IActionsCreatorConstructor,
} from '../../../components';
import { RetaxConsumer } from '../../../retax';

export interface IEnhancedComponentContextType {
  kernel: IKernel;
}

export interface IEnhancer {
  extendApi<R extends IRoutesMap>(
    Target: IApiConstructor<R>,
    config: IApiRuntimeConfig<R>
  ): IApiConstructor<R>;

  extendActionsCreator(
    Target: IActionsCreatorConstructor,
    injectableEntries: IInjectableUserServiceMap
  ): IActionsCreatorConstructor;

  extendComponent(
    ComposedComponent: React.ComponentClass<any>,
    injectableEntries: IInjectableUserServiceMap
  ): typeof RetaxConsumer;
}

export interface ISplitEntriesReturn {
  keys: string[];
  values: IUserServiceConstructor[];
}
