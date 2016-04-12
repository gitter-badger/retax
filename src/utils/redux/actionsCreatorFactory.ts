import { IAction, IActionCreator, IPayloadCreator, IMetaCreator } from './interfaces';

function id<T>(x: T): T {
  return x;
}

export default function makeActionCreator<P, M>(
  type: string,
  payloadCreator?: P|IPayloadCreator<P>,
  metaCreator?: IMetaCreator<M>
): IActionCreator<P, M> {
  const finalPayloadCreator: IPayloadCreator<P> = payloadCreator instanceof Function ? payloadCreator : id;
  const finalMetaCreator: IMetaCreator<M> = metaCreator instanceof Function ? metaCreator : id;

  return function(...args: any[]): IAction<P, M> {
    let action: IAction<P, M> = {
      type,
    };

    if (args.length > 0) {
      action.meta = finalMetaCreator(...args);
      action.payload = finalPayloadCreator(...args);
    }

    if (args.length === 1 && args[0] instanceof Error) {
      action.error = true;
    }

    return action;
  }
}
