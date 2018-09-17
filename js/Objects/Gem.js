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

    eventBus.subscribe('clear', clearBusCallback);
    // eventBus.subscribe('clicked', clickedBusCallback);
    eventBus.subscribe('selected', selectedBusCallback);

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

        eventBus.post('clear');
    
        if (event.button === 0){
            console.log(`Left click on: ${this.name} with mouse button ${event.button}`);
            if (my.selected){
                my.del = true;
                this.parent.remove(gem);
                eventBus.post('removed');
            } else {
                my.selected = true;
                gem.material = materials[6]; // material to white
                console.log(`selected - ${my.material} ${this.name}`);                        
                eventBus.post('selected', my.material, this.position);
            }

        }  else {
            console.log(`Right click on: ${this.name} with mouse button ${event.button}`);
        }
    }


    function clearBusCallback(){
        my.selected = false;
        gem.material = materials[my.material];
    }

    // function clickedBusCallback(eventType, material, position){

    //     // console.log(arg1, arg2, my.object.position);

    //     if (my.object.position === position) return ; // it was my message

    //     my.selected = false;
    //     gem.material = materials[my.material];

    //     if (my.material === arg1 && distance(my.object.position, position) < 1.05){
    //         my.selected = true;
    //         gem.material = materials[6]; // material to white
    //         console.log(`selected - ${my.material} ${my.object.name}`);                        
    //         eventBus.post('selected', my.material, my.object.position);
    //     }
    // }

    function selectedBusCallback(eventType, material, position){

        // console.log(arg1, arg2, my.object.position);

        if (my.object.position === position || my.selected) return; // it was my message or I was already processed

        if (my.material === material && distance(my.object.position, position) < 1.05){
            my.selected = true;
            gem.material = materials[6]; // material to white
            console.log(`selected - ${my.material} ${my.object.name}`);                        
            eventBus.post('selected', my.material, my.object.position);                       
        }
    }

    function distance(p1,p2){
            var dx = p1.x - p2.x; 
            var dy = p1.y - p2.y; 
            var dz = p1.z - p2.z; 
            return Math.sqrt(dx*dx+dy*dy+dz*dz); 
          }
    
}