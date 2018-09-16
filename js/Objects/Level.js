function Level(scene, eventBus, pos){
    var my=this;
    this.del = false;
    this.rightRotation = false;
    this.leftRotation = false;

    const level = new THREE.Object3D;
    level.name = "Level"+pos;
    
    this.object = level;
    scene.add(level);

    eventBus.subscribe('test', eventBusTest);

    const rightButton = new ButtonRight(scene, eventBus, pos, rightArrowClick);
    const leftButton = new ButtonLeft(scene, eventBus, pos, leftArrowClick);

    this.update = function(time) {
        if (pos > 2)
        level.rotation.y += (pos-2)*.01;
    }
    
    function rightArrowClick(event){
        console.log(`Rotate Level ${pos} Right clicked with mouse button ${event.button}`);
        eventBus.post('test');
    }

    function leftArrowClick(event){
        console.log(`Rotate Level ${pos} Left clicked with mouse button ${event.button}`);

    }

    function eventBusTest(){
        console.log(`Event Fired in Level ${pos}`)
    }



}