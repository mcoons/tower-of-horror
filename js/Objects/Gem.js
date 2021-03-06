function Gem(scene, eventBus, gameState, levelObjects, x, y, z, geometry, material){

    var explosionInProgress = false;
    var rotationInProgress = false;
    var droppingInProgress = false;

    var my=this;
    this.material = material;
    this.del = false;
    this.selected = false;
    this.name = x + "," + y + "," + z;

    this.dropping = false;
    this.startDropping = null;
    this.endDropping = null;
    this.droppingStartTime = null;
    this.droppingLength = .5;

    var selectedCount = 0;
    
    const gem = new THREE.Mesh(geometry, materials[material]);
    this.object = gem;
    this.id = gem.uuid;
    
    gem.position.set(x,y,z);
    gem.callback = gemClicked;
    gem.name = x + "," + y + "," + z;
    scene.add(gem);

    levelObjects[y].object.add(gem);
  
    subscribe();

    this.update = function(time) {
        worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( my.object.matrixWorld );

        if (worldPosition.z > .95){
            gem.rotation.y -=.01;
            if (gem.rotation.y < -2*Math.PI) {
                gem.rotation.y = 0;
            }
        }
            var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( my.object.matrixWorld );

        let newName = Math.round( worldPosition.x ) + "," + Math.round( worldPosition.y ) + "," + Math.round( worldPosition.z );
        gem.name = newName;
        this.name = newName;

        if (this.dropping){
            let elapsed = (new Date()).getTime() / 1000 - this.droppingStartTime;
            if ( elapsed >= this.droppingLength ) {
                this.dropping = false;
                gem.position.y = this.endDropping;
                eventBus.post('droppingEnded');

                worldPosition = new THREE.Vector3();
                worldPosition.setFromMatrixPosition( my.object.matrixWorld );

                eventBus.post("newGem", my.material, my.object.position, worldPosition);
                unsubscribe();      

                my.del = true;
                my.object.parent.remove(gem);

                return;
            }
            // x = A + t * (B - A)   // lerp formula

            let newPos = this.startDropping + elapsed * (this.endDropping - this.startDropping) * ( 1/ this.droppingLength);
            gem.position.y = newPos;
        } // end if dropping
    }
    
    function gemClicked(event){

        if (explosionInProgress || rotationInProgress || droppingInProgress) return;

        var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( this.matrixWorld );

        if (worldPosition.z < .5){ console.log("NOT ON FRONT PLANE!!"); return };
    
        if (event.button === 0){
            if (my.selected && selectedCount > 1){
                unsubscribe();      
                soundEplode();
                my.del = true;
                this.parent.remove(gem);

                eventBus.post('removed', my.material, worldPosition);
                eventBus.post('dropGems');
            } else if (my.selected && selectedCount === 1){
                soundBadSelect();
                gem.material = badSelectedMaterial; // material to red

            } else {
                eventBus.post('clear', my.material, worldPosition);
                soundSelect();

                my.selected = true;
                gem.material = selectedMaterial; // material to white
                eventBus.post('selected', my.material, worldPosition);
            }
        } else {
            console.log(`Right click on: ${this.name} with mouse button ${event.button}`);
        }
    }

    function newLevelBusCallback(){
        unsubscribe();      

        my.del = true;
        my.object.parent.remove(gem);
    }
    

    function myChannelBusCallback(eventType, message, value){
        switch (message) {
            case 'moveto':
                if (my.dropping || Math.round(my.object.position.y) === value) return; 

                eventBus.post('droppingStarting');
        
                my.dropping = true;
                my.droppingStartTime = (new Date()).getTime() / 1000;
                my.startDropping = gem.position.y;
                my.endDropping = value;
                
            break;
        
            default:
                console.log("Unknown personal message.")
            break;
        }
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

        var animationInProgress = false;  // ????????

        selectedCount++;

        var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( my.object.matrixWorld );

        if (worldPosition === position || my.selected) return; // it was my message or I was already processed

        if (my.material === material && distance(worldPosition, position) < 1.05){
            my.selected = true;
            gem.material = selectedMaterial; // material to white
            eventBus.post('selected', my.material, worldPosition);                       
        }
    }

    function removedBusCallback(eventType, material, position){

        selectedCount = 0;

        var worldPosition = new THREE.Vector3();
        worldPosition.setFromMatrixPosition( my.object.matrixWorld );
        
        if (my.selected){
            eventBus.post("explosion", material, worldPosition);
            
            unsubscribe();

            my.del = true;
            gem.parent.remove(gem);
        }
    }

    function explosionStartingBusCallback(){
        explosionInProgress = true
    }

    function explosionEndedBusCallback(){
        explosionInProgress = false;
    }

    function droppingStartingBusCallback(){
        droppingInProgress = true
    }

    function droppingEndedBusCallback(){
        droppingInProgress = false;
    }

    function rotationStartingBusCallback(){
        rotationInProgress = true
    }

    function rotationEndedBusCallback(){
        rotationInProgress = false;
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
        eventBus.subscribe('newLevel', newLevelBusCallback);
        eventBus.subscribe('explosionStarting', explosionStartingBusCallback);
        eventBus.subscribe('explosionEnded', explosionEndedBusCallback);
        eventBus.subscribe('rotationStarting', rotationStartingBusCallback);
        eventBus.subscribe('rotationEnded', rotationEndedBusCallback);
        eventBus.subscribe('droppingStarting', droppingStartingBusCallback);
        eventBus.subscribe('droppingEnded', droppingEndedBusCallback);    
    }

    function unsubscribe(){
        eventBus.unsubscribe('clear', clearBusCallback);
        eventBus.unsubscribe('selected', selectedBusCallback);
        eventBus.unsubscribe('removed', removedBusCallback);  
        eventBus.unsubscribe(my.id, myChannelBusCallback);
        eventBus.unsubscribe('newLevel', newLevelBusCallback);
        eventBus.unsubscribe('explosionStarting', explosionStartingBusCallback);
        eventBus.unsubscribe('explosionEnded', explosionEndedBusCallback);    
        eventBus.unsubscribe('rotationStarting', rotationStartingBusCallback);
        eventBus.unsubscribe('rotationEnded', rotationEndedBusCallback);
        eventBus.unsubscribe('droppingStarting', droppingStartingBusCallback);
    }
}