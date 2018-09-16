function Gem(scene, x, y, z, geometry, material){
    var my=this;
    this.material = material;
    this.del = false;
    this.selected = false;
    const gem = new THREE.Mesh(geometry, material);
    this.object = gem;

    gem.position.set(x,y,z);
    gem.callback = gemClicked;
    gem.name = x + "," + y + "," + z;
	scene.add(gem);

    this.update = function(time) {
        gem.rotation.y -=.01;
        if (gem.rotation.y < -2*Math.PI) {
            gem.rotation.y = 0;
        }
    }
    
    function gemClicked(event){
        if (this.position.z < .5){ console.log("NOT ON FRONT PLANE!!"); return };
    
        if (event.button === 0){
            console.log("left click on: " + this.name);
            if (my.selected){
                my.del = true;
                scene.remove(gem);
            } else {
                my.selected = true;
                gem.material.color.setHex(0xffffff);
            }

        }  
    }
}