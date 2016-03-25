/**
 * Define a boostrapper. (something configurable and able to bootstrap something else)
 *
 * @export
 * @interface IBootstrapper
 * @template O Type of the input parameter of config
 * @template B Type of the input parameter of boostrap
 * @template R Type of the output parameter of boostrap
 */
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
