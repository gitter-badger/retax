import * as React from 'react';
import { injectable } from 'inversify';

import { IAnnotator } from './interfaces';

import { Enhancer, IEnhancer } from '../enhancer';

import { Injector, IInjector } from '../../kernel';
import {
  IApiRuntimeConfig, IApiConstructor, IRoutesMap,
  IActionsCreatorConstructor,
  IActionsCreatorRuntimeConfig,
  IRetaxComponentRuntimeConfig,
} from '../../components';


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

  public Api<R extends IRoutesMap>(config: IApiRuntimeConfig<R>): ClassDecorator {
    return (Target: IApiConstructor<R>) => {

      const EnhancedTarget = this._enhancer.extendApi(Target, config);
      this._injector.registerService(EnhancedTarget);

      return EnhancedTarget;
    };
  }

  public ActionsCreator(config: IActionsCreatorRuntimeConfig): ClassDecorator {
    return (Target: IActionsCreatorConstructor) => {

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
