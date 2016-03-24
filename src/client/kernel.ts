import { Kernel } from 'inversify';

import { DomBootstrapper, IBootstrapper } from '../shared/bootstrap';
import { RetaxOptionReader, IOptionReader, IRetaxOptions } from '../shared/optionsReaders';
import { DomStateReader, IStateReader } from '../shared/stateReaders';
import { DomCookieReader, ICookieReader } from '../shared/cookieReaders';
import { internalConfig, IInternalConfig }  from '../shared/internalConfig';
import { ReduxFacade, IReduxFacade } from '../shared/redux';
import { DomRenderer, IRenderer } from '../shared/renderers';

const kernel = new Kernel();

// construtor
kernel.bind<IBootstrapper<IRetaxOptions, Element, Promise<void>>>('Bootstrapper').to(DomBootstrapper).inSingletonScope();
kernel.bind<IOptionReader<IRetaxOptions>>('RetaxOptionReader').to(RetaxOptionReader).inSingletonScope();
kernel.bind<IStateReader>('StateReader').to(DomStateReader).inSingletonScope();
kernel.bind<ICookieReader>('CookieReader').to(DomCookieReader).inSingletonScope();
kernel.bind<IReduxFacade>('ReduxFacade').to(ReduxFacade).inSingletonScope();
kernel.bind<IRenderer>('Renderer').to(DomRenderer).inSingletonScope();

// value
kernel.bind<IInternalConfig>('InternalConfig').toValue(internalConfig);

export default kernel;
