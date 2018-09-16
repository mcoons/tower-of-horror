function Level(scene, pos){
    var my=this;
    this.del = false;
    const level = new THREE.Object3D;
    this.object = level;

    level.name = "Level"+pos;
    
    scene.add(level);

    this.update = function(time) {
        level.rotation.y += (pos-3)*.01;
	}
}