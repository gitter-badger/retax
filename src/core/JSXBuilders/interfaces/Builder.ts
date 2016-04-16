import { IInversifyKernelFacade } from '../../inversifyKernelFacade';

export interface IJSXBuilder {
  build(kernel: IInversifyKernelFacade): Promise<JSX.Element>;
}
