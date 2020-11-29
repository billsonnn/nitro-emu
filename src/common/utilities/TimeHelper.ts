import * as moment from 'moment';

export class TimeHelper
{
    public static get now(): Date
    {
        return new Date();
    }

    public static get currentTimestamp(): number
    {
        return Date.now();
    }

    public static add(date: Date, amount: moment.DurationInputArg1, unit?: moment.unitOfTime.DurationConstructor): Date
    {
        return moment(date).add(amount, unit).toDate();
    }

    public static between(check: Date, against: Date, asType: moment.unitOfTime.Base): number
    {
        const result = moment.duration(moment(against).diff(check)).as(asType);

        if(result > 2147483647) return 2147483647;

        return result;
    }

    public static until(endTime: Date, asType: moment.unitOfTime.Base): number
    {
        const result = moment.duration(moment(endTime).diff(moment())).as(asType);

        if(result > 2147483647) return 2147483647;

        return result;
    }

    public static to(date: Date, asType: moment.unitOfTime.Base): number
    {
        return moment(date).get(asType);
    }

    public static isNextDay(check: Date, against: Date): boolean
    {
        return moment(check).startOf('day').isSame(moment(against).startOf('day').add(1, 'days'));
    }

    public static isToday(check: Date): boolean
    {
        return moment(check).isSame(moment(TimeHelper.now), 'd');
    }

    public static formatDate(date: Date, format: string): string
    {
        return moment(date).format(format);
    }

    public static timeBetween(past: Date, future: Date): { years: number, months: number, days: number, totalSeconds: number }
    {
        const pastDate      = moment(past);
        const futureDate    = moment(future);

        const totalSeconds = futureDate.diff(pastDate, 'seconds');

        const years = futureDate.diff(pastDate, 'year');
        pastDate.add(years, 'years');

        const months = futureDate.diff(pastDate, 'months');
        pastDate.add(months, 'months');
        
        const days = futureDate.diff(pastDate, 'days');

        return {
            years,
            months,
            days,
            totalSeconds
        };
    }
}