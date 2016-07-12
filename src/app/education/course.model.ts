import {Exam} from './exam.model';
export class Course {
    public _id: number;
    public name:string;
    public description:string;
    public exams:Exam[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}