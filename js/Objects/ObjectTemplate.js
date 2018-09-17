function ObjectTemplate(scene){
    // "my" used for reference to class values in callbacks
    var my=this;  

    // Used to delete from GameManagers update array
    this.del = false;  

    mesh=THREE.mesh...;

    // Callback when mesh is clicked     
    mesh.callback = callback;  

    // Reference to THREE.mseh object
    this.object = mesh;


    // Frame update called from GameManager update loop
    this.update = function(time) {  

    }
    
    // Callback when mesh is clicked     
    function callback(){

    }
}