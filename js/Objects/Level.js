
function Level(scene, eventBus, pos){

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

    const level = new THREE.Object3D;
    level.name = "Level"+pos;
    
    this.object = level;
    scene.add(level);

    const rightButton = new ButtonRight(scene, eventBus, pos, rightArrowClick);
    const leftButton = new ButtonLeft(scene, eventBus, pos, leftArrowClick);

    this.update = function(time) {
        if (this.rotating){
            let elapsed = (new Date()).getTime() / 1000 - this.rotationStartTime;
            if ( elapsed >= this.rotationLength ) {
                this.rotating = false;
                level.rotation.y = this.endRotation;
                // eventBus.post('animationEnded');
                eventBus.post('rotationEnded');

                eventBus.post('dropGems');
                return;
            }
            // x = A + t * (B - A)

            let newRot = this.startRotation + elapsed * (this.endRotation - this.startRotation) * ( 1/ this.rotationLength);
            level.rotation.y = newRot;
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

    function rightArrowClick(event){
        if (explosionInProgress || rotationInProgress || droppingInProgress) return;
        // eventBus.post('animationStarting');
        eventBus.post('rotationStarting');
        soundRotate();

        if (my.rotating) return; 

        eventBus.post('clear');

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = level.rotation.y;
        my.endRotation = level.rotation.y + Math.PI/2;
    }

    function leftArrowClick(event){
        if (explosionInProgress || rotationInProgress || droppingInProgress) return;
        // eventBus.post('animationStarting');
        eventBus.post('rotationStarting');
        soundRotate();
        if (my.rotating) return; 

        eventBus.post('clear');

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = level.rotation.y;
        my.endRotation = level.rotation.y - Math.PI/2;
    }

}