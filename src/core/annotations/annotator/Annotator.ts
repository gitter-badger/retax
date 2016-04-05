import * as React from 'react';
import { injectable, inject } from 'inversify';

import { IAnnotator } from './interfaces';

import { ENHANCER, IEnhancer } from '../enhancer';
import {
  INJECTOR, IInjector,
  IInjectableUserServiceMap,
  IUserServiceConstructor,
  IApiServiceRuntimeConfig, IApiServiceConstructor,
  IActionsCreatorServiceConstructor,
  IActionsCreatorServiceRuntimeConfig,
  IRetaxComponentRuntimeConfig,
} from '../../kernel';

@injectable()
export default class Annotator implements IAnnotator {
  constructor(
    @inject(INJECTOR) private _injector: IInjector,
    @inject(ENHANCER) private _enhancer: IEnhancer
  ) {}

  public action(): MethodDecorator {
    return (target: typeof Object, key: string, descriptor: PropertyDescriptor) => {
      const metadata: string[] = Reflect.getMetadata('retax:actions', target) || [];

      metadata.push(key);

      Reflect.defineMetadata('retax:actions', metadata, target);
    };
  }

  public Api(config: IApiServiceRuntimeConfig): ClassDecorator {
    return (Target: IApiServiceConstructor) => {

      const EnhancedTarget = this._enhancer.extendApi(Target, config);
      this._injector.deferRegister(EnhancedTarget);

      return EnhancedTarget;
    };
  }

  public ActionsCreator(config: IActionsCreatorServiceRuntimeConfig): ClassDecorator {
    return (Target: IActionsCreatorServiceConstructor) => {
      const { keys, values } = this._splitEntries(config.apis);

      const servicesId = this._injector.registerServicesList(values);

      const EnhancedTarget = this._enhancer.extendActionsCreator(Target, keys, servicesId);

      this._injector.deferRegister(EnhancedTarget);

      return EnhancedTarget;
    };
  }

  public RetaxComponent(config: IRetaxComponentRuntimeConfig): ClassDecorator {
    return (ComposedComponent: React.ComponentClass<any>) => {
      const { keys, values } = this._splitEntries(config.actionsCreators);

      const servicesId = this._injector.registerServicesList(values);

      return this._enhancer.extendComponent(ComposedComponent, keys, servicesId);
    };
  }

  private _splitEntries(injectableEntries: IInjectableUserServiceMap): { keys: string[], values: IUserServiceConstructor[] } {
    const entries = Object.entries(injectableEntries);
    const keys = entries.map(e => e[0]);
    const values = entries.map(e => e[1]);

    return { keys, values };
  }
}
