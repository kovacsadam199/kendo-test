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