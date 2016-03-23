import 'reflect-metadata';

import { Kernel } from 'inversify';

import { DefaultBoostrapper, IBootstrapper } from '../shared/bootstrap';
import { RetaxOptionReader, IRetaxOptionReader } from '../shared/optionsReaders/retax';
import { DomStateReader, IStateReader } from '../shared/stateReaders';
import { internalConfig, IInternalConfig }  from '../shared/internalConfig';

const kernel = new Kernel();

// construtor
kernel.bind<IBootstrapper>('IBootstrapper').to(DefaultBoostrapper);
kernel.bind<IStateReader>('IStateReader').to(DomStateReader);
kernel.bind<IRetaxOptionReader>('IRetaxOptionReader').to(RetaxOptionReader);

// value
kernel.bind<IRetaxOptionReader>('RetaxOptionReader').toValue(new RetaxOptionReader());
kernel.bind<IInternalConfig>('InternalConfig').toValue(internalConfig);

const domStateReader = kernel.get<IStateReader>('IStateReader');
kernel.bind<IStateReader>('StateReader').toValue(domStateReader);


export default kernel.get<IBootstrapper>('IBootstrapper');
