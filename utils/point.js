class Point {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static fromMatrix(matrix) {
        return new Point(matrix.get(0, 0), matrix.get(1, 0), matrix.get(2, 0));
    }

    static fromPoint(point) {
        return new Point(point.x, point.y, point.z);
    }

    magnitude() {
        return Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z));
    }

    normalize() {
        const magnitude = this.magnitude();
        return new Point(this.x / magnitude, this.y / magnitude, this.z / magnitude);
    }

    copy() {
        return new Point(this.x, this.y, this.z);
    }

    toMatrix() {
        return Matrix.from([[this.x], [this.y], [this.z]]);
    }

    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    translate(distance) {
        this.x += distance.x;
        this.y += distance.y;
        this.z += distance.z;
    }

    rotateX(degrees) {
        const rotationMatrix = Matrix.getXRotation(degrees);
        this._rotate(rotationMatrix);
    }

    rotateY(degrees) {
        const rotationMatrix = Matrix.getYRotation(degrees);
        this._rotate(rotationMatrix);
    }

    rotateZ(degrees) {
        const rotationMatrix = Matrix.getZRotation(degrees);
        this._rotate(rotationMatrix);
    }

    _rotate(rotationMatrix) {
        const pointMatrix = this.toMatrix();

        const newPointMatrix = rotationMatrix.multiply(pointMatrix);
        this.x = newPointMatrix.get(0, 0);
        this.y = newPointMatrix.get(1, 0);
        this.z = newPointMatrix.get(2, 0);
    }

    isEqual(point) {
        const epsilon = 0.01;
        const x = Math.abs(point.x - this.x) < epsilon;
        const y = Math.abs(point.y - this.y) < epsilon;
        const z = Math.abs(point.z - this.z) < epsilon;
        
        return x && y && z;
    }
}