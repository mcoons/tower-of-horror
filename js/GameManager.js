
function GameManager(canvas) {

    const geometries = [
        new THREE.IcosahedronGeometry(.45, 0),
        new THREE.IcosahedronGeometry(.45, 1),
        new THREE.IcosahedronGeometry(.45, 2)
    ];

    const height = 6;

    const levelObjects = [];

    const clock = new THREE.Clock();

    const rand = LCG(17191);  
    const bag = new GrabBag(0,3,5,rand); 
 
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }


    const scene = buildScene();
    window.scene = scene;

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

    // eventBus.subscribe("info", infoBusCallback);
    eventBus.subscribe("info", columnInfoBusCallback);
    eventBus.subscribe("newGem", newGemBusCallback);
    eventBus.subscribe("dropGems", dropGemsBusCallback);

    // var listener = new THREE.AudioListener();
    // var audioLoader = new THREE.AudioLoader();


    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

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

        return camera;
    }


    function createSceneObjects(scene) {

        new Background(scene, eventBus);
        // new Lighting(scene);

        const sceneObjects = [ new Lighting(scene)];

        let tower = new Tower(scene, eventBus);
        sceneObjects.push(tower);

        for (let y = 0; y < height; y++) {
            let level = new Level(scene, eventBus, y);
            levelObjects.push(level);
            sceneObjects.push(level);
            tower.object.add(level.object);
            for (let x = -1; x < 2; x++){
                for (let z = -1; z < 2; z++){
                    if (x === 0 && z === 0) continue;
                    let rnum = bag.getRndNumber();
                    let gem = new Gem(scene, eventBus, levelObjects, x,y,z, geometries[2], rnum);
                    sceneObjects.push(gem);
                    level.object.add(gem.object);
                }
            }
        }

        console.log("--- levelObjects ---");
        console.log(levelObjects);
        return sceneObjects;
    }

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneObjects.length; i++){
        	sceneObjects[i].update(elapsedTime);
        }

        let removedObjects = sceneObjects.filter(
            subject => subject.del === true
        );

        sceneObjects = sceneObjects.filter(
            subject => subject.del === false
        );

        renderer.render(scene, camera);
    }

    function newGemBusCallback(eventType, material, localPosition, globalPosition){
        let position = levelObjects[Math.round(globalPosition.y)].object.worldToLocal(globalPosition);

        let gem = new Gem(scene, eventBus, levelObjects, Math.round(position.x), Math.round(position.y), Math.round(position.z), geometries[2], material);
        sceneObjects.push(gem);
        levelObjects[Math.round(globalPosition.y)].object.add(gem.object);
    } 

    function infoBusCallback(){
        console.log("--- sceneObject info ---");
        // sceneObjects.forEach( object => console.log(object) );
        console.log(sceneObjects);

        console.log("--- eventBus info ---");
        console.log(eventBus.eventObjects);
    }

    function dropGemsBusCallback(){
        console.log("--- sceneObject info ---");
        console.log(sceneObjects);

        // let tower = sceneObjects.filter( obj => obj.name = "Tower");
        let tower = sceneObjects[1]; // ???????  WILL THIS EVEER CHANGE ITS INDEX  ???????

        // console.log("--- tower ---");
        // console.log(tower);
        let levels = tower.object.children;
        // console.log("--- levels ---");
        // console.log(levels);

        let columns = {
            "-1,-1": [],
            "-1,0": [],
            "-1,1": [],
            "0,-1": [],
            "0,0": [],
            "0,1": [],
            "1,-1": [],
            "1,0": [],
            "1,1": []
        };

        levels.forEach( (level, index) => {
            for (let x = -1; x < 2; x++ ){
                for (let z = -1; z < 2; z++){
                    if (x === 0 && z === 0) continue;

                    let children = level.children;
                    // console.log("--- children ---");
                    // console.log(children);
                    let columnData = children.filter(c => c.name.split(",")[0] == x  && c.name.split(",")[2] == z );
                    // console.log(`--- column ${x} ${z} ---`);
                    // console.log(columnData);
                    if (columnData[0]) columns[x+','+z].push(columnData[0]);
                
                }  // z
            } // x
        }) // foreach
        // console.log('--- columns ---');
        // console.log(columns);
            
        for (var key in columns) {
            // skip loop if the property is from prototype
            if (!columns.hasOwnProperty(key)) continue;

            // console.log("-key-");
            // console.log(columns[key]);

            columns[key].forEach( (element, index) => eventBus.post(  element.uuid, "moveto", index));
            // columns[key].forEach( (element, index) => console.log(  element.uuid, "moveto", index));
        }        
    }

    function infoBusCallback(){
        console.log("--- sceneObject info ---");
        // sceneObjects.forEach( object => console.log(object) );
        console.log(sceneObjects);

        console.log("--- eventBus info ---");
        console.log(eventBus.eventObjects);
    }

    function columnInfoBusCallback(){
        console.log("--- sceneObject info ---");
        console.log(sceneObjects);

        // let tower = sceneObjects.filter( obj => obj.name = "Tower");
        let tower = sceneObjects[1]; // ???????  WILL THIS EVEER CHANGE ITS INDEX  ???????

        // console.log("--- tower ---");
        // console.log(tower);
        let levels = tower.object.children;
        // console.log("--- levels ---");
        // console.log(levels);

        let columns = {
            "-1,-1": [],
            "-1,0": [],
            "-1,1": [],
            "0,-1": [],
            "0,0": [],
            "0,1": [],
            "1,-1": [],
            "1,0": [],
            "1,1": []
        };

        levels.forEach( (level, index) => {
            for (let x = -1; x < 2; x++ ){
                for (let z = -1; z < 2; z++){
                    if (x === 0 && z === 0) continue;

                    let children = level.children;
                    // console.log("--- children ---");
                    // console.log(children);
                    let columnData = children.filter(c => c.name.split(",")[0] == x  && c.name.split(",")[2] == z );
                    // console.log(`--- column ${x} ${z} ---`);
                    // console.log(columnData);
                    if (columnData[0]) columns[x+','+z].push(columnData[0]);
                
                }  // z
            } // x
        }) // foreach
        // console.log('--- columns ---');
        // console.log(columns);
            
        for (var key in columns) {
            // skip loop if the property is from prototype
            if (!columns.hasOwnProperty(key)) continue;

            // console.log("-key-");
            // console.log(columns[key]);

            columns[key].forEach( (element, index) => eventBus.post(  element.uuid, "moveto", index));
            // columns[key].forEach( (element, index) => console.log(  element.uuid, "moveto", index));
        }        
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