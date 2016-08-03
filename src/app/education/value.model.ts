import {Activity} from './activity.model';
import {School} from './school.model';
import {Project} from "./project.model";
export class Value{
    public value: number;
    public project:Project; // Used only in front-end. In backend, the project is defined through the activity
    public activity:Activity;
    public school:School;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}