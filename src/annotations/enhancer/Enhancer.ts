import * as React from 'react';
import { injectable, Kernel } from 'inversify';

import { IEnhancer, IEnhancedComponentContextType, ISplitEntriesReturn } from './interfaces';

import { IUserService, IInjectableUserServiceMap } from '../../kernel';
import { mapValuesToKeys } from '../../utils';
import {
  IApiRuntimeConfig, IApiConstructor, IRoutesMap,
  IActionsCreatorConstructor,
} from '../../components';
import { RetaxConsumer } from '../../retax';

export default class Enhancer implements IEnhancer {
  public extendApi<R extends IRoutesMap>(
    Target: IApiConstructor<R>,
    config: IApiRuntimeConfig<R>
  ): IApiConstructor<R> {

    class EnhancedApi extends Target {
      constructor(...args: any[]) {
        super(...args);
        this.configure(config);
      }
    }

    return EnhancedApi;
  }

  public extendActionsCreator(
    Target: IActionsCreatorConstructor,
    injectableEntries: IInjectableUserServiceMap
  ): IActionsCreatorConstructor {

    const { keys, values } = this.splitEntries(injectableEntries);

    @injectable(...values)
    class EnhancedActionsCreator extends Target {
      constructor(...args: IUserService[]) {
        super(...args);
        this.configure({ apis: mapValuesToKeys(keys, args) });
      }
    }

    return EnhancedActionsCreator;
  }

  public extendComponent(
    ComposedComponent: React.ComponentClass<any>,
    injectableEntries: IInjectableUserServiceMap
  ): typeof RetaxConsumer {

    const { keys, values } = this.splitEntries(injectableEntries);

    class RetaxComponent extends RetaxConsumer<void, void> {
      public static displayName: string = `WithServices(${ComposedComponent.displayName || 'Nameless'})`;
      public static contextTypes: React.ValidationMap<any> = {
        kernel: React.PropTypes.instanceOf(Kernel),
      };

      public context: IEnhancedComponentContextType;

      public render(): JSX.Element {
        const { kernel } = this.context;
        const services = values.map(Service => kernel.get<IUserService>(Service));

        return React.createElement(
          ComposedComponent,
          Object.assign(mapValuesToKeys(keys, services), this.props)
        );
      }
    }

    return RetaxComponent;
  }

  private splitEntries(injectableEntries: IInjectableUserServiceMap): ISplitEntriesReturn {
    const entries = Object.entries(injectableEntries);
    const keys = entries.map(e => e[0]);
    const values = entries.map(e => e[1]);

    return { keys, values };
  }
}
