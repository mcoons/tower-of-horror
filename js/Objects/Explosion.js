function Explosion(scene, eventBus, gameState, x,y,z, mycolor)
{

    
    // const materials = [
    //     matMaterial,
    //     matMaterial2,
    //     matMaterial3,
    //     matMaterial4,
    //     matMaterial5,
    //     matMaterial6,
    //     matMaterial7,
    //     matMaterial8,
    //     matMaterial9,
        
    //     new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true, name: 0 }),
    //     new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true, name: 1 }),
    //     new THREE.MeshStandardMaterial({ color: 0x0000ff, flatShading: true, name: 2 }),
    //     new THREE.MeshStandardMaterial({ color: 0x00ffff, flatShading: true, name: 3 }),
    //     new THREE.MeshStandardMaterial({ color: 0xffff00, flatShading: true, name: 4 }),
    //     new THREE.MeshStandardMaterial({ color: 0xff00ff, flatShading: true, name: 5 }),
    //     new THREE.MeshStandardMaterial({ color: 0x99ff00, flatShading: true, name: 6 }),
    //     new THREE.MeshStandardMaterial({ color: 0x0099ff, flatShading: true, name: 7 }),
    //     new THREE.MeshStandardMaterial({ color: 0xff0099, flatShading: true, name: 8 }),
    //     new THREE.MeshStandardMaterial({ color: 0x9900b0, flatShading: true, name: 9 })
    // ];
    
    // console.log("color =", materials[mycolor].color)

    this.del = false;
    var my=this;
    var color =  materials[mycolor].color;
    var movementSpeed = .05;
    var totalObjects = 5000;
    var objectSize = .01;
    this.duration = .5;

    this.startTime = (new Date()).getTime() / 1000;

    // var sizeRandomness = 4000;
    /////////////////////////////////
    var dirs = [];
    // var parts = [];
    var material = new THREE.PointsMaterial( { size: objectSize,  color: color} );
    //   material.map =THREE.TextureLoader(
    //     "textures/particle.png"
    //   );
    var geometry = new THREE.Geometry();
    var particles = new THREE.Points( geometry, material );

  
    for (i = 0; i < totalObjects; i ++) { 
        var vertex = new THREE.Vector3();
        vertex.x = x;
        vertex.y = y;
        vertex.z = z;

        geometry.vertices.push( vertex );
        dirs.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
    }
  
    this.object = particles;
    this.object.callback = function(){};
    this.name = "explosion";
    this.status = true;
    
    this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
    this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
    this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);
    
    scene.add( this.object  ); 
  
    this.update = function(time){

        objectSize *= .6;
        var material = new THREE.PointsMaterial( { size: objectSize,  color: color });
        this.object.material = material;

        let elapsed = (new Date()).getTime() / 1000 - this.startTime;
        if (elapsed >= this.duration)
        {
            this.del = true;
            this.status = false;
            scene.remove(this.object);

        }


        if (this.status == true){
            var pCount = totalObjects;
            while(pCount--) {
                var particle =  this.object.geometry.vertices[pCount]
                particle.y += dirs[pCount].y;
                particle.x += dirs[pCount].x;
                particle.z += dirs[pCount].z;
            }
            this.object.geometry.verticesNeedUpdate = true;
        }
    }
  
}


// parts.push(new Explosion(0, 0));

// function update() {
         
// var pCount = parts.length;
// while(pCount--) {
//     parts[pCount].update();
// }


// }



