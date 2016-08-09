import {District} from './district.model';
export class Region {
    public _id: number;
    public name: String;
    public districts: District[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}