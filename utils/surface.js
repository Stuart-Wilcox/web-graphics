class Surface {
    constructor(point1, point2, point3, colour) {
        this.p1 = point1;
        this.p2 = point2;
        this.p3 = point3;
        this.colour = colour;
    }

    getPoints() {
        return [this.p1, this.p2, this.p3];
    }

    toString() {
        return [this.p1.toString(), this.p2.toString(), this.p3.toString()].join(',\n')
    }

    setColour(colour) {
        this.colour = colour;
    }

    getColour() {
        return this.colour;
    }

    normal() {
        // diff of two points
        const vect1 = new Point(
            this.p1.x - this.p2.x,
            this.p1.y - this.p2.y,
            this.p1.z - this.p2.z,
        );

        // diff of other two points
        const vect2 = new Point(
            this.p3.x - this.p2.x,
            this.p3.y - this.p2.y,
            this.p3.z - this.p2.z,
        );

        // 23 31 12
        // calculate cross product of two vectors to obtain normal
        const normal = new Point(
            (vect1.y * (vect2.z)) - (vect1.z * (vect2.y)),
            (vect1.z * (vect2.x)) - (vect1.x * (vect2.z)),
            (vect1.x * (vect2.y)) - (vect1.y * (vect2.x))
        );

        return normal;//.normalize();
    }

    shade(lightSource) {
        const normal = this.normal();
        const centroid = this.centroid();

        const vect1 = new Point(normal.x - centroid.x, normal.y - centroid.y, normal.z - centroid.z);
        const vect2 = new Point(lightSource.x - centroid.x, lightSource.y - centroid.y, lightSource.z - centroid.z);

        const magnitude1 = Math.sqrt((vect1.x*vect1.x) + (vect1.y*vect1.y) + (vect1.z*vect1.z));
        const magnitude2 = Math.sqrt((vect2.x*vect2.x) + (vect2.y*vect2.y) + (vect2.z*vect2.z));
        const magnitudeProduct = magnitude1 * magnitude2;

        let dotProduct = (vect1.x*vect2.x) + (vect1.y*vect2.y) + (vect1.z*vect2.z);
        if(dotProduct < 0){
            dotProduct = 0.0;
        }

        const angle = Math.acos(dotProduct / magnitudeProduct);
        const coefficient = (2 * angle / Math.PI);

        const shade = new Colour(this.colour.r * coefficient, this.colour.g * coefficient, this.colour.b * coefficient);
        return shade;
    }

    centroid() {
        return new Point(
            (this.p1.x + this.p2.x + this.p3.x) / 3,
            (this.p1.y + this.p2.y + this.p3.y) / 3,
            (this.p1.z + this.p2.z + this.p3.z) / 3
        )
    }

    zMax() {
        if (this.p1.z > this.p2.z) {
            if (this.p1.z > this.p3.z) {
                return this.p1.z;
            }
            return this.p3.z;
        }
        if (this.p2.z > this.p3.z) {
            return this.p2.z;
        }
        return this.p3.z;
    }

    translate(distance) {
        this.p1.translate(distance);
        this.p2.translate(distance);
        this.p3.translate(distance);
    }

    rotateX(degrees) {
        this.p1.rotateX(degrees);
        this.p2.rotateX(degrees);
        this.p3.rotateX(degrees);
    }

    rotateY(degrees) {
        this.p1.rotateY(degrees);
        this.p2.rotateY(degrees);
        this.p3.rotateY(degrees);
    }

    rotateZ(degrees) {
        this.p1.rotateZ(degrees);
        this.p2.rotateZ(degrees);
        this.p3.rotateZ(degrees);
    }
}