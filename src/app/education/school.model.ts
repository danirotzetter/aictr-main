export class School {
    public _id: number;
    public name: String;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}