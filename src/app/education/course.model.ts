import {Exam} from './exam.model';
import {Student} from '../person/student.model';
export class Course {
    public _id: number;
    public name:string;
    public description:string;
    public exams:Exam[];
    public students:Student[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}