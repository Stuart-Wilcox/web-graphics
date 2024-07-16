class Scene {
    constructor(lightSource = new Point(0, 0, 0)) {
        this.objects = new Set();
        this.lightSource = lightSource;
        this.ambientLight = 1;
    }

    getObjects() {
        return this.objects;
    }

    addObject(object) {
        this.objects.add(object);
    }

    removeObject(object) {
        this.objects.delete(object);
    }

    getLightSource() {
        return this.lightSource;
    }

    setLightSource(lightSource) {
        this.lightSource = lightSource;
    }

    getAmbientLight() {
        return this.ambientLight;
    }

    setAmbientLight(ambientLight) {
        this.ambientLight = ambientLight;
    }
}