function ButtonRight(scene, pos, callback){
    var my=this;
    this.del = false;


    // var geometry = new THREE.PlaneGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    // var plane = new THREE.Mesh( geometry, material );
    // plane.position.x = 2;
    // plane.position.y = pos;
    // plane.position.z = 1;

    // plane.callback = callback;
    // scene.add( plane );

    var spriteMap = new THREE.TextureLoader().load( 'textures/right.png' );

    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(.75, .75, 1);
    sprite.position.x = 2;
    sprite.position.y = pos;
    sprite.position.z = 1;
    sprite.callback = callback;
    sprite.name = "Right Arrow "+pos;

    scene.add( sprite );

    this.update = function(time) {

    }
    



}