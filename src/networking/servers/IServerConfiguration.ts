export interface IServerConfiguration
{
    ip: string;
    port: number;
    logging: {
        messages: {
            incoming: boolean,
            outgoing: boolean,
            unknown: boolean,
            invalid: boolean
        }
    }
}