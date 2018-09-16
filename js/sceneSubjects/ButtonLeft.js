function ButtonLeft(scene, pos, callback){
    var my=this;
    this.del = false;

    var spriteMap = new THREE.TextureLoader().load( 'textures/left.png' );

    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(.75, .75, 1);
    sprite.position.x = -2;
    sprite.position.y = pos;
    sprite.position.z = 1;
    sprite.callback = callback;
    sprite.name = "Left Arrow "+pos;

    scene.add( sprite );

    this.update = function(time) {

    }
    



}