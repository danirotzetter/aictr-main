import {Activity} from './activity.model';
import {Metric} from './metric.model';
export class Project {
    public _id: number;
    public name:string;
    public description:string;
    public activities:Activity[];
    public metrics:Metric[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}