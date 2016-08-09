import {District} from './district.model';
export class School {
    public _id: number;
    public name: String;
    public district: District;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}