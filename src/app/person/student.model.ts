export class Student {
    private birthday: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}