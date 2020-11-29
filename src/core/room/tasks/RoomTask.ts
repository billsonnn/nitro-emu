export abstract class RoomTask
{
    private _name: string;
    private _isRunning: boolean;

    constructor(name: string)
    {
        this._name          = name;
        this._isRunning     = false;
    }

    public run(): void
    {
        if(this._isRunning) return;
        
        this._isRunning = true;

        this.onRun();

        this._isRunning = false;
    }

    protected abstract onRun(): void;

    public get name(): string
    {
        return this._name;
    }

    public get isRunning(): boolean
    {
        return this._isRunning;
    }
}