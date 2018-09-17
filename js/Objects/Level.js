function Level(scene, eventBus, pos){
    var my=this;
    this.del = false;
    this.rightRotation = false;
    this.leftRotation = false;

    const level = new THREE.Object3D;
    level.name = "Level"+pos;
    
    this.object = level;
    scene.add(level);

    const rightButton = new ButtonRight(scene, eventBus, pos, rightArrowClick);
    const leftButton = new ButtonLeft(scene, eventBus, pos, leftArrowClick);

    this.update = function(time) {
        if (pos > 2)
        level.rotation.y += (pos-2)*.01;
        if (level.rotation > Math.PI*2){
            level.rotation = 0;
        }
    }
    
    function rightArrowClick(event){
        eventBus.post('clear');
        console.log(`Rotate Level ${pos} Right clicked with mouse button ${event.button}`);
    }

    function leftArrowClick(event){
        eventBus.post('clear');
        console.log(`Rotate Level ${pos} Left clicked with mouse button ${event.button}`);

    }

}