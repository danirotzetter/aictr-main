export class Value{
    private value: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}