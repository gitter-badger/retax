import 'reflect-metadata';

import { Kernel } from 'inversify';

import { DefaultBoostrapper, IBootstrapper } from '../shared/bootstrap';
import { RetaxOptionReader, IRetaxOptionReader } from '../shared/optionsReaders/retax';
import { DomStateReader, IStateReader } from '../shared/stateReaders';
import { internalConfig, IInternalConfig }  from '../shared/internalConfig';
import { ReduxFacade, IReduxFacade } from '../shared/redux';

const kernel = new Kernel();

// construtor
kernel.bind<IBootstrapper>('IBootstrapper').to(DefaultBoostrapper).inSingletonScope();
kernel.bind<IRetaxOptionReader>('IRetaxOptionReader').to(RetaxOptionReader).inSingletonScope();
kernel.bind<IStateReader>('IStateReader').to(DomStateReader).inSingletonScope();
kernel.bind<IReduxFacade>('IReduxFacade').to(ReduxFacade).inSingletonScope();

// value
kernel.bind<IInternalConfig>('IInternalConfig').toValue(internalConfig);

export default kernel.get<IBootstrapper>('IBootstrapper');