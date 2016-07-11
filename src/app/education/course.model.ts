export class Course {
    public _id: number;
    public name:string;
    public description:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}