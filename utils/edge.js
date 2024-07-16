class Edge {
    constructor(point1, point2) {
        this.p1 = point1;
        this.p2 = point2;
    }

    toString() {
        return `${this.p1.toString()} -> ${this.p2.toString()}`;
    }

    translate(distance) {
        this.p1.translate(distance);
        this.p2.translate(distance);
    }

    rotateX(degrees) {
        this.p1.rotateX(degrees)
        this.p2.rotateX(degrees)
    }

    rotateY(degrees) {
        this.p1.rotateY(degrees);
        this.p2.rotateY(degrees);
    }

    rotateZ(degrees) {
        this.p1.rotateZ(degrees);
        this.p2.rotateZ(degrees);
    }
}