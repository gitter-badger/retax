import * as React from 'react';
import * as _ from 'lodash';
import { inject, multiInject, injectable, Kernel } from 'inversify';

import { IEnhancer, IEnhancedComponentContextType } from './interfaces';

import {
  IUserService, IUserServiceMap,
  IApiServiceRuntimeConfig, IApiServiceConstructor,
  IActionsCreatorServiceConstructor,
} from '../../kernel';
import {
  RetaxConsumer,
  IRetaxConfigProxy, RETAX_CONFIG_PROXY,
  IReduxFacade, REDUX_FACADE,
} from '../../retax';

@injectable()
export default class Enhancer implements IEnhancer {
  public extendApi(
    Target: IApiServiceConstructor,
    config: IApiServiceRuntimeConfig
  ): IApiServiceConstructor {

    @injectable()
    class EnhancedApi extends Target {
      constructor(
        @inject(REDUX_FACADE) reduxFacade: IReduxFacade,
        @inject(RETAX_CONFIG_PROXY) configProxy: IRetaxConfigProxy
      ) {
        super(reduxFacade, configProxy);
        this.configure(config);
      }
    }

    return EnhancedApi;
  }

  public extendActionsCreator(
    Target: IActionsCreatorServiceConstructor,
    keys: string[],
    servicesId: Symbol
  ): IActionsCreatorServiceConstructor {

    @injectable()
    class EnhancedActionsCreator extends Target {
      constructor(
        @multiInject(servicesId) services: IUserService[]
      ) {
        super();

        this.configure({ apis: _.zipObject<IUserServiceMap>(keys, services) });
      }
    }

    return EnhancedActionsCreator;
  }

  public extendComponent(
    ComposedComponent: React.ComponentClass<any>,
    keys: string[],
    servicesId: Symbol
  ): typeof RetaxConsumer {

    class RetaxComponent extends RetaxConsumer<void, void> {
      public static displayName: string = `WithServices(${ComposedComponent.displayName || 'Nameless'})`;
      public static contextTypes: React.ValidationMap<any> = {
        kernel: React.PropTypes.instanceOf(Kernel),
      };

      public context: IEnhancedComponentContextType;

      public render(): JSX.Element {
        const { kernel } = this.context;

        const services = kernel.get<IUserService[]>(servicesId);

        return React.createElement(
          ComposedComponent,
          Object.assign(_.zipObject<IUserServiceMap>(keys, services), this.props)
        );
      }
    }

    return RetaxComponent;
  }
}
