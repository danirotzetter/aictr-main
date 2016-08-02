import {Activity} from './activity.model';
export class Project {
    public _id: number;
    public name:string;
    public description:string;
    public activities:Activity[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}