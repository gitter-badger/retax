import { Kernel } from 'inversify';

import { DomBootstrapper, IBootstrapper } from '../bootstrap';
import { RetaxOptionReader, IRetaxOptionReader, IRetaxOptions } from '../optionsReaders';
import { DomStateReader, IStateReader } from '../stateReaders';
import { DomCookieReader, ICookieReader } from '../cookieReaders';
import { internalConfig, IInternalConfig }  from '../internalConfig';
import { ReduxFacade, IReduxFacade } from '../redux';
import { DomRenderer, IRenderer } from '../renderers';

const kernel = new Kernel();

// construtor
kernel.bind<IBootstrapper<IRetaxOptions, Element, Promise<void>>>('Bootstrapper').to(DomBootstrapper).inSingletonScope();
kernel.bind<IRetaxOptionReader>('RetaxOptionReader').to(RetaxOptionReader).inSingletonScope();
kernel.bind<IStateReader>('StateReader').to(DomStateReader).inSingletonScope();
kernel.bind<ICookieReader>('CookieReader').to(DomCookieReader).inSingletonScope();
kernel.bind<IReduxFacade>('ReduxFacade').to(ReduxFacade).inSingletonScope();
kernel.bind<IRenderer>('Renderer').to(DomRenderer).inSingletonScope();

// value
kernel.bind<IInternalConfig>('InternalConfig').toValue(internalConfig);

export default kernel;
