export class Byte
{
    public static BYTE_MAX_VALUE: number = 127;
    
    private _value: number;

    constructor(value: number)
    {
        this._value = value;
    }

    public get value(): number
    {
        return this._value;
    }
}