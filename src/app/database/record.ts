export class Record {
    constructor(args) {
        for (let key in args) {
            this[key] = args[key];
        }
    }
}
