function Gem(scene, eventBus, x, y, z, geometry, material){
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true, name: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true, name: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x0000ff, flatShading: true, name: 2 }),
        new THREE.MeshStandardMaterial({ color: 0x00ffff, flatShading: true, name: 3 }),
        new THREE.MeshStandardMaterial({ color: 0xffff00, flatShading: true, name: 4 }),
        new THREE.MeshStandardMaterial({ color: 0xff00ff, flatShading: true, name: 5 }),
        new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true, name: 6 }),

    ];

    var my=this;
    this.material = material;
    this.del = false;
    this.selected = false;
    this.name = x + "," + y + "," + z;


    var selectedCount = 0;

    
    const gem = new THREE.Mesh(geometry, materials[material]);
    this.object = gem;
    this.id = gem.uuid;
    
    gem.position.set(x,y,z);
    gem.callback = gemClicked;
    gem.name = x + "," + y + "," + z;
    scene.add(gem);
    // gem.castShadow = true; //default is false
    // gem.receiveShadow = false; //default
  
    subscribe();

    this.update = function(time) {
        // gem.rotation.y -=.01;
        // if (gem.rotation.y < -2*Math.PI) {
        //     gem.rotation.y = 0;
        // }

        var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( my.object.matrixWorld );

        gem.name = Math.round( worldPosition.x ) + "," + Math.round( worldPosition.y ) + "," + Math.round( worldPosition.z );
        this.name = Math.round( worldPosition.x ) + "," + Math.round( worldPosition.y ) + "," + Math.round( worldPosition.z );
        


    }
    
    function gemClicked(event){


        var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( this.matrixWorld );

        if (worldPosition.z < .5){ console.log("NOT ON FRONT PLANE!!"); return };
    
        if (event.button === 0){
            console.log(`Left click on: ${this.name} with mouse button ${event.button}`);
            if (my.selected && selectedCount > 1){
                unsubscribe();      

                my.del = true;
                this.parent.remove(gem);

                eventBus.post('removed', my.material, worldPosition);
            } else if (my.selected && selectedCount === 1){
                console.log("EEEERRRRRPPPP")



            } else {
                eventBus.post('clear', my.material, worldPosition);

                my.selected = true;
                gem.material = materials[6]; // material to white
                // console.log(`selected - ${my.material} ${this.name}`);                        
                eventBus.post('selected', my.material, worldPosition);

            }

        } else {
            console.log(`Right click on: ${this.name} with mouse button ${event.button}`);
        }

        console.log("selected = ",selectedCount);
    }

    function myChannelBusCallback(){


    }

    function clearBusCallback(eventType, material, position){
        selectedCount = 0;

        var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( my.object.matrixWorld );

        if (worldPosition === position) return; // it was my message or I was already processed

        my.selected = false;
        gem.material = materials[my.material];
    }

    function selectedBusCallback(eventType, material, position){
        selectedCount++;

        var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( my.object.matrixWorld );

        if (worldPosition === position || my.selected) return; // it was my message or I was already processed

        if (my.material === material && distance(worldPosition, position) < 1.05){
            my.selected = true;
            gem.material = materials[6]; // material to white
            // console.log(`selected - ${my.material} ${my.object.name}`);                        
            eventBus.post('selected', my.material, worldPosition);                       
        }
    }

    function removedBusCallback(eventType, material, position){

        selectedCount = 0;

        var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( my.object.matrixWorld );

        // if (worldPosition === position) return; // it was my message or I was already processed

        if (my.selected){

            unsubscribe();

            my.del = true;
            gem.parent.remove(gem);
        }

    }

    function distance(p1,p2){
        var dx = p1.x - p2.x; 
        var dy = p1.y - p2.y; 
        var dz = p1.z - p2.z; 
        return Math.sqrt(dx*dx+dy*dy+dz*dz); 
    }

    function subscribe(){
        eventBus.subscribe('clear', clearBusCallback);
        eventBus.subscribe('selected', selectedBusCallback);
        eventBus.subscribe('removed', removedBusCallback);
        eventBus.subscribe(my.id, myChannelBusCallback);
    }

    function unsubscribe(){
        eventBus.unsubscribe('clear', clearBusCallback);
        eventBus.unsubscribe('selected', selectedBusCallback);
        eventBus.unsubscribe('removed', removedBusCallback);  
        eventBus.unsubscribe(my.id, myChannelBusCallback);
  
    }
    
}