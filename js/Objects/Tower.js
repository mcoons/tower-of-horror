function Tower(scene, eventBus){
    // var animationInProgress = false;
    var explosionInProgress = false;
    var rotationInProgress = false;
    var droppingInProgress = false;


    // eventBus.subscribe('animationStarting', animationStartingBusCallback);
    // eventBus.subscribe('animationEnded', animationEndedBusCallback);
    eventBus.subscribe('explosionStarting', explosionStartingBusCallback);
    eventBus.subscribe('explosionEnded', explosionEndedBusCallback);
    eventBus.subscribe('rotationStarting', rotationStartingBusCallback);
    eventBus.subscribe('rotationEnded', rotationEndedBusCallback);
    eventBus.subscribe('droppingStarting', droppingStartingBusCallback);
    eventBus.subscribe('droppingEnded', droppingEndedBusCallback);

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
        if (this.rotating){
            let elapsed = (new Date()).getTime() / 1000 - this.rotationStartTime;
            if ( elapsed >= this.rotationLength ) {
                this.rotating = false;
                tower.rotation.y = this.endRotation;

                // eventBus.post('animationEnded');
                eventBus.post('rotationEnded');
                return;
            }
            // x = A + t * (B - A)

            let newRot = this.startRotation + elapsed * (this.endRotation - this.startRotation) * (1/this.rotationLength);
            tower.rotation.y = newRot;
        }    
    }


    // function animationStartingBusCallback(){
    //     animationInProgress = true
    // }


    // function animationEndedBusCallback(){
    //     animationInProgress = false;
    // }
    
        
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

    function rightTowerClick(event){
        if (explosionInProgress || rotationInProgress || droppingInProgress) return;
        // eventBus.post('animationStarting');
        eventBus.post('rotationStarting');

        if (my.rotating) return; 

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = tower.rotation.y;
        my.endRotation = tower.rotation.y + Math.PI/2;
    }

    function leftTowerClick(event){
        if (explosionInProgress || rotationInProgress || droppingInProgress) return;
        // eventBus.post('animationStarting');
        eventBus.post('rotationStarting');

        if (my.rotating) return; 

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = tower.rotation.y;
        my.endRotation = tower.rotation.y - Math.PI/2;
    }

}