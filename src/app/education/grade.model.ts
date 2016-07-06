export class Grade{
    private grade: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}