import {Activity} from './activity.model';
import {School} from './school.model';
import {Metric} from './metric.model';
import {Project} from "./project.model";
export class Value{
    public _id: number;
    public date: Date;
    public figure: number;
    public project:Project; // Used only in front-end. In backend, the project is defined through the activity
    public activity:Activity;
    public metric:Metric;
    public metricId:number;
    public school:School;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}