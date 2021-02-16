export class ChartQuestion {
    public hour: string
    public day: string
    public month: string
    public count: number

    constructor(hour: string, day: string, month: string) {
        this.hour = hour;
        this.day = day;
        this.month = month
        this.count = 1;
    }
}