const main = async () => {
	const myWindow = new MyWindow();
	// // myWindow.drawLine(10, 10, 300, 250)

	const torus = new Torus(2, 7, 12);
	torus.setColour(new Colour(255, 0, 0));
	// torus.rotateX(2);
	// torus.rotateZ(15);
	// torus.translate(new Point(15, -3, 4));

	const torus2 = new Torus(3, 15, 12);
	torus2.setColour(new Colour(0, 255, 0));
	// torus.rotateX(2);
	// torus.rotateZ(15);
	// torus2.translate(new Point(15, -3, 4));

	const torus3 = new Torus(4, 30, 12);
	torus3.setColour(new Colour(0, 0, 255));
	// torus.rotateX(2);
	// torus.rotateZ(15);
	// torus3.translate(new Point(15, -3, 4));

	// const cube = new Cube(10);
	// cube.rotateX(5)
	// cube.rotateZ(10);
	// cube.setColour(new Colour(255, 0, 0));
	// cube.translate(new Point(0, 0, 0))

	// const obj = new Object();
	// obj.addSurface(new Surface(new Point(10, 0, 0), new Point(0, 10, 0), new Point(0, 10, 10)));

	
	const cameraPosition = new Point(-300, 200, -100);
	const camera = new Camera(cameraPosition, 0, 0, 180);

	// console.log(camera.camera.toString());
	// camera.projectPoint(new Point(-100, 1, 1));

	const lightSource = new Point(0, 100, -400);
	const scene = new Scene(lightSource);
	// scene.addObject(cube);
	scene.addObject(torus);
	scene.addObject(torus2);
	scene.addObject(torus3);
	// scene.addObject(obj);

	myWindow.drawScene(camera, scene);

	const random = (low, high) => {
		const diff = high - low;
		return (Math.random() * diff) + low;
	}

	setInterval(() => {
		torus.rotateX(1);
		torus.rotateY(1);
		// torus.rotateZ(-1);
		torus2.rotateX(1);
		// torus2.rotateY(-1);
		torus2.rotateZ(1);
		// torus3.rotateX(-1);
		torus3.rotateY(1);
		torus3.rotateZ(1);
		// torus.rotateX(random(-2, 1));
		// torus.rotateZ(random(-2, 1));
		// torus.rotateY(random(-2, 1));
		myWindow.drawScene(camera, scene);
	}, 100);

	// myWindow.fillTriangle(0, 0, 0, 10, 10, 0)
};


window.addEventListener('load', () => setTimeout(main, 10));