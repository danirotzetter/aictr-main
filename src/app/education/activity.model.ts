import {Metric} from './metric.model';
import {Value} from './value.model';
export class Activity{
    public _id: number;
    public name: String;
    public metrics:Metric[];
    public values:Value[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}