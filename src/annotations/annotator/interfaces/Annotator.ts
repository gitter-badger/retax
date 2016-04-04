import { IRetaxComponentRuntimeConfig, IApiRuntimeConfig, IActionsCreatorRuntimeConfig } from '../../../components';

export interface IAnnotator {
  action(): MethodDecorator;
  Api<R>(config: IApiRuntimeConfig<R>): ClassDecorator;
  ActionsCreator(config: IActionsCreatorRuntimeConfig): ClassDecorator;
  RetaxComponent(config: IRetaxComponentRuntimeConfig): ClassDecorator;
}
