export class Person {
    name: string;
    selectable : boolean

    constructor(name: string, selectable = true) {
        this.name = name;
        this.selectable = selectable;
    }

    get initials () {
        const segs = this.name.split(" ");
        return ((segs[0][0] || '') + (segs[1][0] || '')).toUpperCase();
    }
}