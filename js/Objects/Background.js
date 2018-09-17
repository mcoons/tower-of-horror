
function Background(scene, eventBus) {
    this.del = false;

    // bottom
    let plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
    plane.name = "bottom plane";
    plane.callback = backgroundClicked;
    plane.rotation.x = - 90 * ( Math.PI / 180 );
    plane.position.y = -5;
    scene.add( plane );

    // top
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
    plane.name = "top plane";
    plane.callback = backgroundClicked;
    plane.rotation.x = 90 * ( Math.PI / 180 );
    plane.position.y = 10;
    scene.add( plane );

    // right
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );
    plane.name = "right plane";
    plane.callback = backgroundClicked;
    plane.rotation.y = - 90 * ( Math.PI / 180 );
    plane.position.x = 6;
    scene.add( plane );

    // left
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );
    plane.name = "left plane";
    plane.callback = backgroundClicked;
    plane.rotation.y = 90 * ( Math.PI / 180 );
    plane.position.x = -6;
    scene.add( plane );

    //back
    plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x101010 } ) );
    plane.name = "back plane";
    plane.callback = backgroundClicked;
    plane.position.z = -10;
    scene.add( plane );

	this.update = function(time) {
    }

    function backgroundClicked(event){
        console.log(`Background clicked with mouse button ${event.button}`);
        eventBus.post('clear');

    }
}