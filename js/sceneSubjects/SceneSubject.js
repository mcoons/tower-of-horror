function SceneSubject(scene) {
	
	const radius = 2;
	const mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 2), new THREE.MeshStandardMaterial({ flatShading: true }));
    this.del = false;

	mesh.position.set(0, 0, -20);
	mesh.callback = gemClicked;
	mesh.name = "gem";
	scene.add(mesh);
	
	this.update = function(time) {
		// const scale = 2;
		const scale = Math.sin(time)+1.5;

		mesh.scale.set(scale, scale, scale);
	}

    function gemClicked(event){
        if (this.position.z < .5){ console.log("NOT ON FRONT PLANE!!"); return };
    
        if (event.button === 0){
            console.log("left click on: " + this.name);
			scene.remove(mesh);
        } else if (event.button === 2){
            console.log("right click on: " + this.name);
        } else {
            console.log("unknown click on: " + this.name);
        }
    
    }

}