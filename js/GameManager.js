
function GameManager(canvas) {

    const geometries = [
        new THREE.IcosahedronGeometry(.45, 0),
        new THREE.IcosahedronGeometry(.45, 1),
        new THREE.IcosahedronGeometry(.45, 2)
    ];

    const clock = new THREE.Clock();

    const rand = LCG(17191);  
    const bag = new GrabBag(0,2,2,rand); 
 
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    var eventBus = new EventBus();
    console.log(eventBus);
    var sceneObjects = createSceneObjects(scene);

    console.log(scene.children);
    console.log(sceneObjects);

    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 100; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.name = "camera";
        camera.position.set(0,2.5,12);

        // console.log(camera);
        return camera;
    }


    function createSceneObjects(scene) {

        new Background(scene);
        new Lighting(scene);

        const sceneObjects = [];

        let tower = new Tower(scene, eventBus);
        sceneObjects.push(tower);

        for (let y = 0; y < 6; y++) {
            let level = new Level(scene, eventBus, y);
            sceneObjects.push(level);
            tower.object.add(level.object);
            for (let x = -1; x < 2; x++){
                for (let z = -1; z < 2; z++){
                    if (x === 0 && z === 0) continue;
                    let rnum = bag.getRndNumber();
                    let gem = new Gem(scene, eventBus, x,y,z, geometries[rnum], rnum);
                    sceneObjects.push(gem);
                    level.object.add(gem.object);
                }
            }
        }

        return sceneObjects;
    }



    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneObjects.length; i++)
        	sceneObjects[i].update(elapsedTime);

        // let removedObjects = sceneObjects.filter(
        //     subject => subject.del === true
        // )

        sceneObjects = sceneObjects.filter(
            subject => subject.del === false
        )

        renderer.render(scene, camera);
    }



    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }

    this.mainListener = function (e) {
        e.preventDefault();
        // console.log(e);
    
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
    
        mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;
    
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        (intersects.length > 0) ? intersects[0].object.callback(e) : console.log(sceneObjects);
        
    }
}