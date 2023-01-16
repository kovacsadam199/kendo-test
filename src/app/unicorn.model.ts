export class Unicorn{
   constructor(
    public name:string,
    public age: number,
    public colour: string,
    private id?: string,){}

    get getId(){
            return this.id
    }
}