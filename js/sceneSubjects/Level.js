function Level(scene, pos){
    var my=this;
    this.del = false;
    const level = new THREE.Object3D;
    this.object = level;

    level.name = "Level"+pos;
    
    scene.add(level);

    const rightButton = new ButtonRight(scene, pos, rightArrowClick);
    const leftButton = new ButtonLeft(scene, pos, leftArrowClick);

    this.update = function(time) {
        // level.rotation.y += (pos-3)*.01;
    }
    
    function rightArrowClick(event){
        console.log(pos + " Right arrow clicked.");

    }

    function leftArrowClick(event){
        console.log(pos + " Left arrow clicked.");

    }



}