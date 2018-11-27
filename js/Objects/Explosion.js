function Explosion(scene, eventBus, gameState, x,y,z, mycolor)
{

    this.del = false;
    var my=this;
    var color =  materials[mycolor].color;
    var movementSpeed = .05;
    var totalObjects = 5000;
    var objectSize = .05;
    this.duration = .3;

    this.startTime = (new Date()).getTime() / 1000;
    eventBus.post('explosionStarting');

    var dirs = [];
    var material = new THREE.PointsMaterial( { size: objectSize,  color: color} );
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

        objectSize *= .8;
        var material = new THREE.PointsMaterial( { size: objectSize,  color: color });
        this.object.material = material;

        let elapsed = (new Date()).getTime() / 1000 - this.startTime;
        if (elapsed >= this.duration)
        {
            this.del = true;
            this.status = false;
            scene.remove(this.object);
            eventBus.post('explosionEnded');
        }


        if (this.status == true){
            var pCount = totalObjects;
            while(pCount--) {
                var particle =  this.object.geometry.vertices[pCount]
                particle.y += dirs[pCount].y * Math.random() * 2;
                particle.x += dirs[pCount].x * Math.random() * 2;
                particle.z += dirs[pCount].z * Math.random() * 2;
            }
            this.object.geometry.verticesNeedUpdate = true;
        }
    }
  
}
