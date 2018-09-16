
function Background(scene) {
    this.del = false;

    // bottom
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
    plane.callback = backgroundClicked;
    plane.rotation.x = - 90 * ( Math.PI / 180 );
    plane.position.y = -5;
    // plane.overdraw = true;
    scene.add( plane );

    // top
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
    plane.callback = backgroundClicked;
    plane.rotation.x = 90 * ( Math.PI / 180 );
    plane.position.y = 10;
    // plane.overdraw = true;
    scene.add( plane );

    // right
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );
    plane.callback = backgroundClicked;
    plane.rotation.y = - 90 * ( Math.PI / 180 );
    plane.position.x = 6;
    // plane.overdraw = true;
    scene.add( plane );

    // left
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );
    plane.callback = backgroundClicked;
    plane.rotation.y = 90 * ( Math.PI / 180 );
    plane.position.x = -6;
    // plane.overdraw = true;
    scene.add( plane );

    //back
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x101010 } ) );
    plane.callback = backgroundClicked;
    // plane.rotation.z = 90 * ( Math.PI / 180 );
    plane.position.z = -10;
    // plane.overdraw = true;
    scene.add( plane );

	this.update = function(time) {

    }

    function backgroundClicked(event){
        console.log("Background clicked.")
    }
}