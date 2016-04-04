import {
  IRetaxComponentRuntimeConfig,
  IApiServiceRuntimeConfig,
  IActionsCreatorServiceRuntimeConfig,
} from '../../../kernel';

export interface IAnnotator {
  action(): MethodDecorator;
  Api(config: IApiServiceRuntimeConfig): ClassDecorator;
  ActionsCreator(config: IActionsCreatorServiceRuntimeConfig): ClassDecorator;
  RetaxComponent(config: IRetaxComponentRuntimeConfig): ClassDecorator;
}
