function Tower(scene, eventBus){
    var my=this;
    this.del = false;

    const tower = new THREE.Object3D;
    this.object = tower;
    tower.name = "Tower Parent";

    scene.add(tower);

    this.update = function(time) {
        tower.rotation.y += .01;
    }
    
    const rightButton = new ButtonRight(scene, -2, rightTowerClick);
    const leftButton = new ButtonLeft(scene, -2, leftTowerClick);

    this.update = function(time) {
        // tower.rotation.y += .04;
    }
    
    function rightTowerClick(event){
        console.log(`Rotate Tower Right clicked with mouse button ${event.button}`);

    }

    function leftTowerClick(event){
        console.log(`Rotate Tower Left clicked with mouse button ${event.button}`);

    }





}