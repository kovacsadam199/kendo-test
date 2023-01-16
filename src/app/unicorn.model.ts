
export class Unicorn{
   constructor(
    public name:string,
    public age: number,
    public colour: string,
    private _id?: string,){}

    get getId(){
            return this._id
    }
}

export interface UnicornI{
       
name:string,
age: number,
colour: string,
_id: string
            
}