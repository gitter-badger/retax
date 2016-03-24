export interface IBootstrapper<O, B, R> {
  /**
   * Configure the boostrapper.
   */
  config(options: O): void;

  /**
   * Run the bootstrapper.
   */
  bootstrap(options?: B): R;
}
