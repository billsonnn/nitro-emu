import { IDisposable } from './disposable';
import { INitroLogger } from './logger';

export interface INitroManager extends IDisposable
{
    init(): Promise<void>;
    dispose(): Promise<void>;
    logger: INitroLogger;
    isLoaded: boolean;
    isLoading: boolean;
    isDisposed: boolean;
    isDisposing: boolean;
}