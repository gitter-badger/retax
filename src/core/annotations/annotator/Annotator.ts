import * as React from 'react';
import { injectable } from 'inversify';

import { IAnnotator } from './interfaces';

import { Enhancer, IEnhancer } from '../enhancer';
import {
  Injector, IInjector,
  IApiServiceRuntimeConfig, IApiServiceConstructor,
  IActionsCreatorServiceConstructor,
  IActionsCreatorServiceRuntimeConfig,
  IRetaxComponentRuntimeConfig,
} from '../../kernel';

@injectable(Injector, Enhancer)
export default class Annotator implements IAnnotator {
  constructor(
    private _injector: IInjector,
    private _enhancer: IEnhancer
  ) {}

  public action(): MethodDecorator {
    return (target: typeof Object, key: string, descriptor: PropertyDescriptor) => {
      const metadata: string[] = Reflect.getMetadata('retax:actions', target) || [];

      metadata.push(key);

      Reflect.defineMetadata('retax:actions', metadata, target);

      descriptor.enumerable = true;
    };
  }

  public Api(config: IApiServiceRuntimeConfig): ClassDecorator {
    return (Target: IApiServiceConstructor) => {

      const EnhancedTarget = this._enhancer.extendApi(Target, config);
      this._injector.registerService(EnhancedTarget);

      return EnhancedTarget;
    };
  }

  public ActionsCreator(config: IActionsCreatorServiceRuntimeConfig): ClassDecorator {
    return (Target: IActionsCreatorServiceConstructor) => {

      const EnhancedTarget = this._enhancer.extendActionsCreator(Target, config.apis);
      this._injector.registerService(EnhancedTarget);

      return EnhancedTarget;
    };
  }

  public RetaxComponent(config: IRetaxComponentRuntimeConfig): ClassDecorator {
    return (ComposedComponent: React.ComponentClass<any>) => {

      return this._enhancer.extendComponent(ComposedComponent, config.actionsCreators);
    };
  }
}
