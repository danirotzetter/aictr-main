export class Person{
    public id: number;
    public firstName: String;
    public lastName: String;
    public email: String;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}