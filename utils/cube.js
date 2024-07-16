class Cube extends Object {
    constructor(size) {
        super();

        this.size = size;

        // make two sets of two adjoined surfaces in each plane
        const p1 = new Point(0, 0, 0);
        const p2 = new Point(size, 0, 0);
        const p3 = new Point(size, size, 0);
        const p4 = new Point(0, size, 0);
        const p5 = new Point(0, 0, size);
        const p6 = new Point(size, 0, size);
        const p7 = new Point(size, size, size);
        const p8 = new Point(0, size, size);

        // bottom
        this.addSurface(new Surface(p1, p2, p3, this.colour));
        this.addSurface(new Surface(p1, p3, p4, this.colour));

        // top
        this.addSurface(new Surface(p5, p6, p7, this.colour));
        this.addSurface(new Surface(p5, p7, p8, this.colour));

        // left
        this.addSurface(new Surface(p1, p5, p6, this.colour));
        this.addSurface(new Surface(p1, p2, p6, this.colour));

        // right
        this.addSurface(new Surface(p4, p7, p8, this.colour));
        this.addSurface(new Surface(p4, p3, p7, this.colour));

        // front
        this.addSurface(new Surface(p2, p3, p7, this.colour));
        this.addSurface(new Surface(p2, p6, p7, this.colour));

        // back
        this.addSurface(new Surface(p1, p4, p8, this.colour));
        this.addSurface(new Surface(p1, p5, p8, this.colour));
    }
}