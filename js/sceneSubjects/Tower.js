function Tower(scene){
    var my=this;
    this.del = false;
    const tower = new THREE.Object3D;
    this.object = tower;
    tower.name = "Tower Parent";

    scene.add(tower);

    this.update = function(time) {
        // tower.rotation.y += .01;
	}
}