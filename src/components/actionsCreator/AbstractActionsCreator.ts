import { IActionsCreator, IActionsCreatorConfig, IExportReturn} from './interfaces';

import { IUserServiceMap } from '../../kernel';

abstract class AbstractActionsCreator implements IActionsCreator {
  public apis: IUserServiceMap;

  public configure(config: IActionsCreatorConfig): void {
    this.apis = config.apis;
  }

  /**
   * We are loosing typing here. We should find a better solution than that
   */
  public export(): IExportReturn {
    const methodNames: string[] = Reflect.getMetadata('retax:actions', this) || [];
    return methodNames.reduce((res, name) => (
      Object.assign(res, { [name]: this[name].bind(this) })
    ), {} as IExportReturn);
  }
}

export default AbstractActionsCreator;
