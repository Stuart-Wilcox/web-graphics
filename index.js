const main = async () => {
	const myWindow = new MyWindow();

	const torus = new Torus(2, 7, 12);
	torus.setColour(new Colour(255, 0, 0));

	const torus2 = new Torus(3, 15, 12);
	torus2.setColour(new Colour(0, 255, 0));

	const torus3 = new Torus(4, 30, 12);
	torus3.setColour(new Colour(0, 0, 255));

	const cameraPosition = new Point(-300, 200, -100);
	const camera = new Camera(cameraPosition, 0, 0, 180);

	const lightSource = new Point(0, 100, -400);
	const scene = new Scene(lightSource);
	scene.addObject(torus);
	scene.addObject(torus2);
	scene.addObject(torus3);

	myWindow.drawScene(camera, scene);

	setInterval(() => {
		torus.rotateX(1);
		torus.rotateY(1);

		torus2.rotateX(1);
		torus2.rotateZ(1);

		torus3.rotateY(1);
		torus3.rotateZ(1);

		myWindow.drawScene(camera, scene);
	}, 100);
};


window.addEventListener('load', () => setTimeout(main, 10));