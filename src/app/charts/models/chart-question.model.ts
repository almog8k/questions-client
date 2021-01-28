export class ChartQuestion{
    public hour:string
    public day:string
    public count:number

    constructor(hour:string, day:string) {
     this.hour = hour;
     this.day = day;
     this.count = 1;        
    }
}