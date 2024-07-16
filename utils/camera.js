class Camera {
    constructor(position, degreesX, degreesY, degreesZ) {
        this.position = new Point(position.x, position.y, position.z);

        const angleX = (Math.PI * degreesX) / 180.0;
        const angleY = (Math.PI * degreesY) / 180.0;
        const angleZ = (Math.PI * degreesZ) / 180.0;

        this.angle = Matrix.getXRotation(angleX).multiply(Matrix.getYRotation(angleY)).multiply(Matrix.getZRotation(angleZ));
    }

    projectScene(scene) {
        const projectedScene = new Scene(scene.lightSource);
        const objects = Array.from(scene.getObjects());
        for (let i = 0; i < objects.length; i++) {
            const projectedObject = this.projectObject(objects[i]);
            projectedScene.addObject(projectedObject);
        }

        return projectedScene;
    }

    projectObject(object) {
        const projectedObject = new Object();
        projectedObject.setColour(object.getColour());
        const surfaces = object.getSurfaces();
        for (let i = 0; i < surfaces.length; i++) {
            const projectedSurface = this.projectSurface(surfaces[i]);
            projectedObject.addSurface(projectedSurface);
        }

        return projectedObject;
    }

    projectSurface(surface) {
        const [p1, p2, p3] = surface.getPoints();
        const projectedP1 = this.projectPoint(p1);
        const projectedP2 = this.projectPoint(p2);
        const projectedP3 = this.projectPoint(p3);

        return new Surface(projectedP1, projectedP2, projectedP3);
    }

    projectPoint(point) {
        const eMat = point.toMatrix().subtract(this.position.toMatrix());
        const dMat = this.angle.multiply(eMat);

        const e = Point.fromMatrix(eMat);
        const d = Point.fromMatrix(dMat);

        const b = new Point();
        b.x = ((e.y / d.y) * d.x) + e.x;
        b.y = ((e.y / d.y) * d.z) + e.z;    
        b.z = point.z;

        // b.x += 256;
        // b.y += 256;

        return b;
    }
}