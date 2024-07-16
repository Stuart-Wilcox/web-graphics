class MyWindow {
    constructor(camera) {
        this.height = 850;
        this.width = 1700;
        this.canvas = this.createCanvas();
    }

    createCanvas() {
        if (this.canvas) {
            return this.canvas; // don't do twice
        }

        const canvas = document.createElement('canvas');
        canvas.className = "canvas";
        canvas.id = "canvas";

        canvas.height = this.height;
        canvas.width = this.width;
        canvas.style.height = canvas.height / window.devicePixelRatio + "px";
        canvas.style.width = canvas.width / window.devicePixelRatio + "px";

        document.body.appendChild(canvas);
        const context = canvas.getContext('2d');
        context.fillStyle = "#000";
        context.lineCap = "square"
        context.lineWidth = 1;
        const dpi = window.devicePixelRatio;
        context.scale(dpi, dpi);

        return canvas;
    }

    clearCanvas() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
    }

    fillTriangle(x1, y1, x2, y2, x3, y3, surfaceColour) {
        let yMax = y1, xMax = x1, yMid = y2, xMid = x2, yMin = y3, xMin = x3;

        if (yMin > yMid) {
            [yMid, yMin] = [yMin, yMid];
            [xMid, xMin] = [xMin, xMid];
        }
        if (yMid > yMax) {
            [yMax, yMid] = [yMid, yMax];
            [xMax, xMid] = [xMid, xMax];
        }
        if (yMin > yMid) {
            [yMid, yMin] = [yMin, yMid];
            [xMid, xMin] = [xMin, xMid];
        }

        if(yMin == yMid){
            this.fillFlatBottomTriangle(xMax, yMax, xMid, yMid, xMin, yMin, surfaceColour);
        }
        else if(yMax == yMin){
            this.fillFlatTopTriangle(xMax, yMax, xMid, yMid, xMin, yMin, surfaceColour);
        }
        else {
            // split the triangle into twwo triangles, one with flat top and one with flat bottom    
            const xNew = (xMax + ((yMid - yMax) / (yMin - yMax)) * (xMin - xMax));
            const yNew = yMid;
        
            this.fillFlatBottomTriangle(xMax, yMax, xMid, yMid, xNew, yNew, surfaceColour);
            this.fillFlatTopTriangle(xNew, yNew, xMid, yMid, xMin, yMin, surfaceColour);
        }
    }

    fillFlatBottomTriangle(x1, y1, x2, y2, x3, y3, colour) {
        // make sure we dont get a divide by zero error
        if(y1 == y2) y1++;
        if(y2 == y3) y3--;

        const m1 = (x1-x2)/(y1-y2);
        const m2 = (x1-x3)/(y1-y3);

        let cx1 = x2;
        let cx2 = x3;

        for(let i = y2; i < y1; i++){
            this.drawLine(cx1, i, cx2, i, colour);
            cx1 += m1;
            cx2 += m2;
        }
    }

    fillFlatTopTriangle(x1, y1, x2, y2, x3, y3, colour) {
        // make sure we dont get a divide by zero error
        if(y1 == y3) y1++;
        if(y2 == y3) y3--;

        // inverse slope
        const m1 = (x1-x3)/(y1-y3);
        const m2 = (x2-x3)/(y2-y3);

        // current x position on each arm of the triangle
        let cx1 = x1;
        let cx2 = x2;

        for(let i = y1; i > y3; i--){
            this.drawLine(cx1, i, cx2, i, colour);
            cx1 -= m1;
            cx2 -= m2;
        }
    }

    drawPixel(x, y, colour) {
        const context = this.canvas.getContext('2d');
        context.fillStyle = colour.toString();
        context.fillRect(x, y, 1, 1);
    }

    drawLine(x1, y1, x2, y2, colour=new Colour()) {
        if(Math.abs(y2 - y1) < Math.abs(x2 - x1)){
            if(x1 > x2){
              // draw line low, reverse ends
              this.drawLineLow(x2, y2, x1, y1, colour);
            }
            else {
              // draw line low, normal
              this.drawLineLow(x1, y1, x2, y2, colour);
            }
          }
          else {
            if(y1 > y2){
              // draw line high, reverse ends
              this.drawLineHigh(x2, y2, x1, y1, colour);
            }
            else {
              // draw line low, reverse ends
              this.drawLineHigh(x1, y1, x2, y2, colour);
            }
          }
    }

    drawLineLow(x1, y1, x2, y2, colour) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        let yi = 1;

        if(dy < 0){
            yi = -1;
            dy *= -1;
        }

        let d = (2 * dy) - dx;
        let y = y1;

        // walk in x
        for(let x = x1; x <= x2; x++){
            this.drawPixel(x, y, colour);
            if(d > 0){
                y += yi;
                d -= 2 * dx;
            }
            d += 2 * dy;
        }
    }

    drawLineHigh(x1, y1, x2, y2, colour) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        let xi = 1;

        if(dx < 0){
            xi = -1;
            dx *= -1;
        }

        let d = (2 * dx) - dy;
        let x = x1;

        // walk in y
        for(let y = y1; y <= y2; y++){
            this.drawPixel(x, y, colour);
            if(d > 0){
            x += xi;
            d -= 2 * dy;
            }
            d += 2 * dx;
        }
    }

    async drawScene(camera, scene) {
        this.clearCanvas();

        const projectedScene = camera.projectScene(scene);

        const lightSource = scene.getLightSource();

        const objects = Array.from(projectedScene.getObjects());
        // log('start');
        for (let i = 0; i < objects.length; i++) {
            const surfaces = objects[i].getSurfaces();
            for (let j = 0; j < surfaces.length; j++) {
                const [p1, p2, p3] = surfaces[j].getPoints();
                const colour = surfaces[j].shade(lightSource);
                // log('shade surface ' + j);
                this.fillTriangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, colour);
                // log('fill triangle' + j);
            }
        }
    }
}