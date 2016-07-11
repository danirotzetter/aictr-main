import {Person} from "./person.model";
export class Teacher extends Person{
    public location: string;

    constructor(values: Object = {}) {
        super(values);
        Object.assign(this, values);
    }
}