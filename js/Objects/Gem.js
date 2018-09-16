function Gem(scene, eventBus, x, y, z, geometry, material){
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: 0x0000ff, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: 0x00ffff, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: 0xffff00, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: 0xff00ff, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true })
    ];

    var my=this;
    this.material = material;
    this.del = false;
    this.selected = false;

    // eventBus.subscribe('selected',eventBusCallback);

    const gem = new THREE.Mesh(geometry, materials[material]);
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
            console.log(`Left click on: ${this.name} with mouse button ${event.button}`);
            if (my.selected){
                my.del = true;
                this.parent.remove(gem);
                eventBus.post('removed');
            } else {
                my.selected = true;
                gem.material = materials[6];
                eventBus.post('selected', this.material);
            }

        }  else {
            console.log(`Left click on: ${this.name} with mouse button ${event.button}`);
        }
    }

    // function eventBusCallback(eventType, arg1, arg2){
    //     switch (eventType) {
    //         case 'selected':
    //                 if (this.material === arg1){
    //                     my.selected = true;
    //                     gem.material = materials[6];                        
    //                 }
    //                 else {
    //                     gem.material = materials[this.material];
    //                     my.selected = false;
    //                 }
    //             break;
        
    //         default:
    //             break;
    //     }

    // }
}