class Torus extends Object {
    constructor(innerRadius, outerRadius, resolution) {
        super();

        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.resolution = resolution;

        const angle = 360 / this.resolution;

        const circle = new Array();
        let point = new Point(0, this.innerRadius, 0);
        circle.push(point);

        // make a circle around the origin in the XZ plane
        for (let i = 0; i < this.resolution-1; i++) {
            const copy = point.copy()
            copy.rotateX(angle);
            circle.push(copy);
            point = copy;
        }

        // move the circle in the Z direction
        const translationPoint = new Point(0, 0, this.outerRadius);
        for(let i = 0; i < this.resolution; i++){
            circle[i].translate(translationPoint);
        }

        // create a second circle and successively join points
        const circle2 = new Array();
        for(let i = 0; i < this.resolution; i++){
            const copy = circle[i].copy();
            copy.rotateY(angle);
            circle2.push(copy);
        }


        for(let j = 0; j < this.resolution; j++){
            for(let i = 1; i < this.resolution; i++){
              // order is super important here! Do no change
              this.addSurface(new Surface(circle2[i-1], circle[i], circle[i-1]));
              this.addSurface(new Surface(circle[i], circle2[i-1], circle2[i]));
            }
            this.addSurface(new Surface(circle2[this.resolution-1], circle[0], circle[this.resolution-1]));
            this.addSurface(new Surface(circle[0], circle2[this.resolution-1], circle2[0]));
        
            for(let i = 0; i < this.resolution; i++){
              circle[i] = circle2[i];
              circle2[i] = circle2[i].copy();
              circle2[i].rotateY(angle);
            }
          }
    }
}