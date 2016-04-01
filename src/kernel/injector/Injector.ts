import * as React from 'react';
import { injectable, IKernelModule, INewable } from 'inversify';

import { IInjector, IModulesMap } from './interfaces';

export default class Injector implements IInjector {
  private _modules: IModulesMap = new Map<INewable<any>, IKernelModule>();

  get userModules(): IKernelModule[] {
    const res: IKernelModule[] = [];

    for (const kernelModule of this._modules.values()) {
      res.push(kernelModule);
    }

    return res;
  }

  public registerService<T>(Service: INewable<T>): void {
    this._modules.set(Service, this.createKernelModule(Service));
  }

  public injectService<T>(Service: INewable<T>): ClassDecorator {
    this.registerService(Service);

    return (Target: typeof Object) => {

      @injectable(Service)
      class WithApi extends Target {
        constructor(api: T) {
          super();
          this['testApi'] = api;
        }
      }

      return WithApi;
    };
  }

  public injectActions<T>(Service: INewable<T>): ClassDecorator {
    this.registerService(Service);

    return (ComposedComponent: any) => {
      class Super extends React.Component<void, void> {
        public static contextTypes: any = {
          kernel: React.PropTypes.any,
        };

        public render() {
          const kernel = this.context['kernel'];
          const actions = kernel.get(Service);

          return React.createElement(ComposedComponent, Object.assign({ actions }, this.props));
        }
      }

      return Super;
    };
  }

  private createKernelModule<T>(Service: INewable<T>): IKernelModule {
    return kernel => {
      kernel.bind<T>(Service).to(Service);
    };
  }
}
