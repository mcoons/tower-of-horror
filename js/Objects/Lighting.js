
function Lighting(scene) {
    this.del = false;

	let light = new THREE.AmbientLight(0x909090); 
	light.name = "ambient light";
	scene.add(light);

	light = new THREE.PointLight("#ffffff", 1);
	light.position.set(0, 150, 150);
	light.name = `point light @ ${light.position}`;
	scene.add(light);

	this.update = function(time) {
	}
}