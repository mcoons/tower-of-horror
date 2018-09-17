function Level(scene, eventBus, pos){
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true, name: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true, name: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x0000ff, flatShading: true, name: 2 }),
        new THREE.MeshStandardMaterial({ color: 0x00ffff, flatShading: true, name: 3 }),
        new THREE.MeshStandardMaterial({ color: 0xffff00, flatShading: true, name: 4 }),
        new THREE.MeshStandardMaterial({ color: 0xff00ff, flatShading: true, name: 5 }),
        new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true, name: 6 }),

    ];


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
        // if (pos > 2)
        // level.rotation.y += (pos-2)*.01;
        // if (level.rotation > Math.PI*2){
        //     level.rotation = 0;
        // }
    }
    
    function rightArrowClick(event){
        eventBus.post('clear');
        console.log(`Rotate Level ${pos} Right clicked with mouse button ${event.button}`);

        level.rotation.y += Math.PI/2;

        // let children = level.children;
        // // console.log(children);
        // level.children.forEach(child => { 

        //     var vector = new THREE.Vector3();
        //     vector.setFromMatrixPosition( child.matrixWorld );

        //     if (child.name === "1,0,1")
        //     {
        //         console.log(child);
        //         console.log(vector);
        //     }

        // });
    }

    function leftArrowClick(event){
        eventBus.post('clear');
        console.log(`Rotate Level ${pos} Left clicked with mouse button ${event.button}`);

        level.rotation.y -= Math.PI/2;


    }

}