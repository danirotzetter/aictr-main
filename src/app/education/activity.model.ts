import {Metric} from './metric.model';
export class Activity{
    public _id: number;
    public date: Date;
    public name: String;
    public metrics:Metric[];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}