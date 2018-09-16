
function GeneralLights(scene) {
    this.del = false;

	const light = new THREE.PointLight("#ffffff", 1);
	light.name = "light";
	light.position.set(150, 150, 150);
	scene.add(light);

	this.update = function(time) {
		// light.intensity = (Math.sin(time)+1.5)/.5;
		// light.color.setHSL( Math.sin(time), 0.5, 0.5 );
	}
}