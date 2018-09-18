
function Background(scene, eventBus) {
    this.del = false;


    // Diffuse - COLOR *
    // Normal - NORM *
    // Displacement - DISP *
    // Roughness - ROUGH *
    // Ambient Occlusion - OCC *
    // Mask - MASK

	// var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	// floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	// floorTexture.repeat.set( 10, 10 );
	// var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	// var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	// var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	// floor.position.y = -0.5;
	// floor.rotation.x = Math.PI / 2;
	// scene.add(floor);


    // var planeDiffuse = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_COLOR.jpg' );
    // var planeDisplacement = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_DISP.png' );
    // var planeNormal = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_NORM.jpg' );
    // var planeRoughness = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_ROUGH.jpg' );
    // var planeOCC = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_OCC.jpg' );
    // var planeMask = new THREE.TextureLoader().load( 'textures/metal1/Metal_Grill_001_MASK.jpg' );

    var planeDiffuse = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_COLOR.jpg' );
    var planeDisplacement = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_DISP.png' );
    var planeNormal = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_NORM.jpg' );
    var planeRoughness = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_DISP_ROUGH.jpg' );
    var planeOCC = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_OCC.jpg' );
    // var planeMask = new THREE.TextureLoader().load( 'textures/metal2/Metal_Pattern_001_MASK.jpg' );


    var planeMaterial = new THREE.MeshStandardMaterial( {map: planeDiffuse } );
    planeMaterial.transparent = true;

    planeMaterial.displacementMap = planeDisplacement;
    planeMaterial.normalMap = planeNormal;
    planeMaterial.roughnessMap = planeRoughness;
    planeMaterial.aoMap = planeOCC;
    // planeMaterial.alphaMap = planeMask;

    // bottom
    // let plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
    let plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );

    plane.name = "bottom plane";
    plane.callback = backgroundClicked;
    plane.rotation.x = - 90 * ( Math.PI / 180 );
    plane.position.y = -5;
    // plane.castShadow = false; //default is false
    // plane.receiveShadow = true; //default
    scene.add( plane );

    // top
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "top plane";
    plane.callback = backgroundClicked;
    plane.rotation.x = 90 * ( Math.PI / 180 );
    plane.position.y = 10;
    // plane.castShadow = false; //default is false
    // plane.receiveShadow = true; //default    
    scene.add( plane );

    // right
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "right plane";
    plane.callback = backgroundClicked;
    plane.rotation.y = - 90 * ( Math.PI / 180 );
    plane.position.x = 6;
    // plane.castShadow = false; //default is false
    // plane.receiveShadow = true; //default    
    plane.position.y = 2.5;
    scene.add( plane );

    // left
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "left plane";
    plane.callback = backgroundClicked;
    plane.rotation.y = 90 * ( Math.PI / 180 );
    plane.position.x = -6;
    plane.position.y = 2.5;
    // plane.castShadow = false; //default is false
    // plane.receiveShadow = true; //default    
    scene.add( plane );

    //back
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 15, 15 ), planeMaterial );
    plane.name = "back plane";
    plane.callback = backgroundClicked;
    plane.position.z = -6;
    plane.position.y = 2.5;
    // plane.castShadow = false; //default is false
    // plane.receiveShadow = true; //default
    scene.add( plane );

	this.update = function(time) {
    }

    function backgroundClicked(event){
        // console.log(`Background clicked with mouse button ${event.button}`);
        eventBus.post('clear');
        eventBus.post("info");

    }
}