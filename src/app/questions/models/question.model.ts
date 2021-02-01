export class Question {
    
    public name: string;   
    public creationDate: string;
    public description: string;
    public id:string  = "";

    constructor( name: string, description: string, creationDate: string = new Date().toDateString() ){    
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
    }
}
