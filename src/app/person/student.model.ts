import {Person} from "./person.model";
export class Student extends Person {
    public birthday: Date;

    constructor(values: Object = {}) {
        super(values);
        Object.assign(this, values);
    }
}