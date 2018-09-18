function Tower(scene, eventBus){
    var my=this;
    this.del = false;

    this.rotating = false;

    this.startRotation = null;
    this.endRotation = null;

    this.rotationStartTime = null;

    this.rotationLength = .5;

    const tower = new THREE.Object3D;
    this.object = tower;
    tower.name = "Tower Parent";

    scene.add(tower);
    
    const rightButton = new ButtonRight(scene, eventBus, -2, rightTowerClick);
    const leftButton = new ButtonLeft(scene, eventBus, -2, leftTowerClick);

    this.update = function(time) {
        // tower.rotation.y -= .01;
        if (this.rotating){
            console.log("rotating");
            let elapsed = (new Date()).getTime() / 1000 - this.rotationStartTime;
            if ( elapsed >= this.rotationLength ) this.rotating = false;
            // x = A + t * (B - A)

            let newRot = this.startRotation + elapsed * (this.endRotation - this.startRotation) * 2;
            tower.rotation.y = newRot;
        }    
    }
    
    function rightTowerClick(event){
        // console.log(`Rotate Tower Right clicked with mouse button ${event.button}`);
        // tower.rotation.y += Math.PI/2;

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = tower.rotation.y;
        my.endRotation = tower.rotation.y + Math.PI/2;


    }

    function leftTowerClick(event){
        // console.log(`Rotate Tower Left clicked with mouse button ${event.button}`);
        // tower.rotation.y -= Math.PI/2;

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = tower.rotation.y;
        my.endRotation = tower.rotation.y - Math.PI/2;
    }





}