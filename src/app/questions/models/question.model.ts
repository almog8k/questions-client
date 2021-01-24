export class Question {
    
    public name: string;   
    public creationDate: string;
    public description: string;
    public id:string  = "q1";

    constructor( name: string, description: string, creationDate: string = new Date().toJSON() ){    
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
    }
}