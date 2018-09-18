
function Lighting(scene) {
    this.del = false;

	let light = new THREE.AmbientLight(0x909090); 
	light.name = "ambient light";
	scene.add(light);

	light = new THREE.PointLight("#ffffff", 1);
	light.position.set(0, 150, 150);
	// light.castShadow = true;
	light.name = `point light @ ${light.position}`;
	scene.add(light);

	// var d = 5;
	// light.castShadow = true;
	// light.shadow.camera.left = - d;
	// light.shadow.camera.right = d;
	// light.shadow.camera.top = d;
	// light.shadow.camera.bottom = - d;
	// light.shadow.camera.near = 1;
	// light.shadow.camera.far = 20;
	// light.shadow.mapSize.x = 1024;
	// light.shadow.mapSize.y = 1024;

	this.update = function(time) {
		light.position.x = (Math.sin(time))*150;
		// light.intensity = (Math.sin(time)+1.5)/.5;
		// light.color.setHSL( Math.sin(time), 0.5, 0.5 );
	}
}