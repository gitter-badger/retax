import { IBootstrapper } from './interfaces';

abstract class ABoostrapper<U, V, T> implements IBootstrapper<U, V, T> {
  public abstract config(config: U): void;
  public abstract bootstrap(options?: V): T;
}

export default ABoostrapper;
