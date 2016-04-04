import { IUserService, IInjectableUserServiceMap, IUserServiceMap } from '../../../kernel';

export interface IActionsCreator extends IUserService {
  apis: IUserServiceMap;

  configure(config: IActionsCreatorConfig): void;

  export(): void;
}

export interface IActionsCreatorConstructor {
  new(...args: any[]): IActionsCreator;
}

/**
 * This is the type of the object passed in the annotation
 */
export interface IActionsCreatorRuntimeConfig {
  apis?: IInjectableUserServiceMap;
}

/**
 * This is the type of the configure function of the action creator
 */
export interface IActionsCreatorConfig {
  apis: IUserServiceMap;
}

export interface IExportReturn extends HashMap<Function> {}
