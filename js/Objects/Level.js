function Level(scene, eventBus, pos){
    // const materials = [
    //     new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true, name: 0 }),
    //     new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true, name: 1 }),
    //     new THREE.MeshStandardMaterial({ color: 0x0000ff, flatShading: true, name: 2 }),
    //     new THREE.MeshStandardMaterial({ color: 0x00ffff, flatShading: true, name: 3 }),
    //     new THREE.MeshStandardMaterial({ color: 0xffff00, flatShading: true, name: 4 }),
    //     new THREE.MeshStandardMaterial({ color: 0xff00ff, flatShading: true, name: 5 }),
    //     new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true, name: 6 }),

    // ];


    var my=this;
    this.del = false;
    
    this.rotating = false;

    this.startRotation = null;
    this.endRotation = null;

    this.rotationStartTime = null;

    this.rotationLength = 1;


    const level = new THREE.Object3D;
    level.name = "Level"+pos;
    
    this.object = level;
    scene.add(level);

    const rightButton = new ButtonRight(scene, eventBus, pos, rightArrowClick);
    const leftButton = new ButtonLeft(scene, eventBus, pos, leftArrowClick);

    this.update = function(time) {
        if (this.rotating){
            console.log("rotating");
            let elapsed = (new Date()).getTime() / 1000 - this.rotationStartTime;
            if ( elapsed >= this.rotationLength ) this.rotating = false;
            // x = A + t * (B - A)

            let newRot = this.startRotation + elapsed * (this.endRotation - this.startRotation) ;
            level.rotation.y = newRot;
        }

    }
    
    function rightArrowClick(event){
        if (my.rightRotation || my.leftRotation) return; 

        eventBus.post('clear');
        // console.log(`Rotate Level ${pos} Right clicked with mouse button ${event.button}`);

        // level.rotation.y += Math.PI/2;

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = level.rotation.y;
        my.endRotation = level.rotation.y + Math.PI/2;

    }

    function leftArrowClick(event){
        if (my.rotating) return; 

        eventBus.post('clear');
        // console.log(`Rotate Level ${pos} Left clicked with mouse button ${event.button}`);

        // level.rotation.y -= Math.PI/2;

        my.rotating = true;
        my.rotationStartTime = (new Date()).getTime() / 1000;
        my.startRotation = level.rotation.y;
        my.endRotation = level.rotation.y - Math.PI/2;




    }

}