class Object {
    constructor() {
        this.points = new Array(); // todo come up with cool object to do this better
        this.surfaces = new Array();
        this.colour = new Colour();
        this.sorted = false;
    }

    getPoints() {
        return this.points;
    }

    _indexOfPoint(point) {
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].isEqual(point)) {
                return i;
            }
        }

        return -1;
    }

    getSurfaces() {
        this.sortSurfaces();
        return this.surfaces;
    }

    sortSurfaces() {
        if (this.sorted) {
            return;
        }

        this.surfaces.sort((a, b) => {
            return a.zMax() - b.zMax();
        });
        this.sorted = true;
    }

    addSurface(surface) {
        this.sorted = false;

        // ensure surface colour matches
        surface.setColour(this.getColour());

        // modify the surface in place to collapse alike points
        const points = [surface.p1, surface.p2, surface.p3];

        for (let i = 0; i < points.length; i++) {
            const index = this._indexOfPoint(points[i]);
            if (index === -1) {
                this.points.push(points[i]);
            }
            else {
                switch (i) {
                    case 0:
                        surface.p1 = this.points[index]; break;
                    case 1:
                        surface.p2 = this.points[index]; break;
                    case 2:
                        surface.p3 = this.points[index]; break;
                }
            }
        }

        // surfaces must be kept in order

        // if (this.surfaces.length === 0) {
        //     this.surfaces.push(surface);
        //     return;
        // }

        // const depth = surface.centroid();
        // for (let i = 0; i < this.surfaces.length; i++) {
        //     const current = this.surfaces[0].centroid();
        //     if (depth.z < current.z) {
        //         this.surfaces.splice(i, 0, surface);
        //         return;
        //     }
        // }

        // add if not added
        this.surfaces.push(surface);
    }

    setColour(colour) {
        this.colour = colour;
    }

    getColour() {
        return this.colour;
    }

    translate(distance) {
        for (let i = 0; i < this.surfaces.length; i++) {
            this.surfaces[i].translate(distance);
        }
    }

    rotateX(degrees) {
        for (let i = 0; i < this.surfaces.length; i++) {
            this.surfaces[i].rotateX(degrees);
        }
    }

    rotateY(degrees) {
        for (let i = 0; i < this.surfaces.length; i++) {
            this.surfaces[i].rotateY(degrees);
        }
    }

    rotateZ(degrees) {
        for (let i = 0; i < this.surfaces.length; i++) {
            this.surfaces[i].rotateZ(degrees);
        }
    }
}   