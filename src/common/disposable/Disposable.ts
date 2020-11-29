import { IDisposable } from './IDisposable';

export class Disposable implements IDisposable
{
    private _isDisposed: boolean;
    private _isDisposing: boolean;

    constructor()
    {
        this._isDisposed    = false;
        this._isDisposing   = false;
    }

    public async dispose(): Promise<void>
    {
        if(this._isDisposed || this._isDisposing) return;
        
        this._isDisposing   = true;
        
        await this.onDispose();

        this._isDisposed    = true;
        this._isDisposing   = false;
    }

    protected onDispose(): void
    {
        return;
    }

    public get isDisposed(): boolean
    {
        return this._isDisposed;
    }

    public set isDisposed(flag: boolean)
    {
        this._isDisposed = flag;
    }

    public get isDisposing(): boolean
    {
        return this._isDisposing;
    }
}