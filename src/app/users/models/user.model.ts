export class User {
    
    public username: string;   
    public password: string;
    public id:string;
   

    constructor( username: string, password: string){    
        this.username = username;
        this.password = password; 
        this.id  = 'U1' ;   
    }
}