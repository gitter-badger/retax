import { IActionsCreator, IExportReturn } from './interfaces';

import {
  IActionsCreatorServiceConfig,
  IUserServiceMap,
  METADATA_KEYS,
} from '../../core';

abstract class AbstractActionsCreator implements IActionsCreator {
  public apis: IUserServiceMap;

  public configure(config: IActionsCreatorServiceConfig): void {
    this.apis = config.apis;
  }

  /**
   * We are loosing typing here. We should find a better solution than that
   */
  public export(): IExportReturn {
    const methodNames: string[] = Reflect.getMetadata(METADATA_KEYS.RETAX_ACTIONS, this) || [];
    return methodNames.reduce((res, name) => (
      Object.assign(res, { [name]: this[name].bind(this) })
    ), {} as IExportReturn);
  }
}

export default AbstractActionsCreator;
