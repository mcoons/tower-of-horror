
function Level(scene, eventBus, pos){

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
                return;
            }
            // x = A + t * (B - A)

            let newRot = this.startRotation + elapsed * (this.endRotation - this.startRotation) * ( 1/ this.rotationLength);
            level.rotation.y = newRot;
        }

    }
    
    function rightArrowClick(event){
        if (my.rotating) return; 

        eventBus.post('clear');
        // console.log(`Rotate Level ${pos} Right clicked with mouse button ${event.button}`);

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = level.rotation.y;
        my.endRotation = level.rotation.y + Math.PI/2;

    }

    function leftArrowClick(event){
        if (my.rotating) return; 

        eventBus.post('clear');
        // console.log(`Rotate Level ${pos} Left clicked with mouse button ${event.button}`);

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = level.rotation.y;
        my.endRotation = level.rotation.y - Math.PI/2;

    }

}