
function Background(scene, eventBus, levelObjects) {
    this.del = false;

    var planeDiffuse = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_COLOR.jpg' );
    var planeDisplacement = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_DISP.png' );
    var planeNormal = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_NORM.jpg' );
    var planeRoughness = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_DISP_ROUGH.jpg' );
    var planeOCC = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_OCC.jpg' );

    var planeMaterial = new THREE.MeshStandardMaterial( {map: planeDiffuse } );
    planeMaterial.transparent = true;
    planeMaterial.displacementMap = planeDisplacement;
    planeMaterial.normalMap = planeNormal;
    planeMaterial.roughnessMap = planeRoughness;
    planeMaterial.aoMap = planeOCC;

    // bottom
    let plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "bottom plane";
    plane.callback = backgroundClicked;
    plane.rotation.x = - 90 * ( Math.PI / 180 );
    plane.position.y = -5;
    scene.add( plane );

    // top
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "top plane";
    plane.callback = backgroundClicked;
    plane.rotation.x = 90 * ( Math.PI / 180 );
    plane.position.y = 10; 
    scene.add( plane );

    // right
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "right plane";
    plane.callback = backgroundClicked;
    plane.rotation.y = - 90 * ( Math.PI / 180 );
    plane.position.x = 6;   
    plane.position.y = 2.5;
    scene.add( plane );

    // left
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "left plane";
    plane.callback = backgroundClicked;
    plane.rotation.y = 90 * ( Math.PI / 180 );
    plane.position.x = -6;
    plane.position.y = 2.5;
    scene.add( plane );

    //back
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "back plane";
    plane.callback = backgroundClicked;
    plane.position.z = -6;
    plane.position.y = 2.5;
    scene.add( plane );

    for (let x = -1; x < 2; x++){
        for (let z = -1; z < 2; z++){

            // bottom
            box = new THREE.Mesh( new THREE.BoxGeometry( .7, .05, .7 ),  new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true}));
            box.name = "column footer";
            box.position.x = x;
            box.position.y = -.4;
            box.position.z = z;
            box.callback = function(){};
            scene.add( box );
            levelObjects[0].object.add(box);
        }
    }

	this.update = function(time) {}

    function backgroundClicked(event){
        console.log("background clicked")
        eventBus.post('clear');
        eventBus.post('info');
    }
}