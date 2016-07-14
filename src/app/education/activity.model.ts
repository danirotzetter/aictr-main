export class Activity{
    public _id: number;
    public date: Date;
    public name: String;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}