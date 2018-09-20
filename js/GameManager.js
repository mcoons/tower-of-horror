
function GameManager(canvas) {

    var gameState = new GameState();
    const geometries = [ new THREE.IcosahedronGeometry(.45, 0), new THREE.IcosahedronGeometry(.45, 1), new THREE.IcosahedronGeometry(.45, 2)];
    const height = 6;
    const levelObjects = [];
    const clock = new THREE.Clock();
    var rand = LCG(17191);  
    var bag = new GrabBag(0,3,5,rand); 
    const screenDimensions = { width: canvas.width, height: canvas.height };
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    var eventBus = new EventBus();
    var sceneObjects = createSceneObjects(scene);

    window.scene = scene;
    
    // console.log(eventBus);
    // console.log(scene.children);
    // console.log(sceneObjects);


    fetch("https://agile-citadel-53491.herokuapp.com/api")
    // fetch("http://localhost:3030/api")

    .then(response => response.json())
    .then(response => gameState.scores = response.scores)
    .then(() => buildScoreList())
    // .then(response => console.log(response.scores[0]))

    console.log("---  gamestate in global ---")
    console.log(gameState.showCenter);

    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }

    eventBus.subscribe("info", infoBusCallback);
    // eventBus.subscribe("info", columnInfoBusCallback);
    eventBus.subscribe("newGem", newGemBusCallback);
    eventBus.subscribe("dropGems", dropGemsBusCallback);
    eventBus.subscribe("selected", selectedBusCallback);
    eventBus.subscribe('removed', removedBusCallback);
    eventBus.subscribe('clear', clearBusCallback);


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

        const sceneObjects = [ new Lighting(scene)];
        
        let tower = new Tower(scene, eventBus);
        sceneObjects.push(tower);
        
        for (let y = 0; y < height; y++) {
            let level = new Level(scene, eventBus, y);
            levelObjects.push(level);
            sceneObjects.push(level);
            tower.object.add(level.object);
        }
                
        new Background(scene, eventBus, levelObjects);
        // console.log("--- levelObjects ---");
        // console.log(levelObjects);
        return sceneObjects;
    }

    function buildScoreList(){
        if (gameState.scores.length < 1) return;

        scorelist = document.getElementById("scorelist");

        gameState.scores.forEach(score => {
            recorddiv = document.createElement("div");
            recorddiv.id = "recorddiv";

            namediv = document.createElement("div");
            namediv.innerText = score.initials.toUpperCase();
            
            scorediv = document.createElement("div");
            scorediv.innerText = score.score;
            
            recorddiv.append( namediv );
            recorddiv.append( scorediv );
            
            scorelist.append( recorddiv );
        })
    }

    function clearLevel(){
        eventBus.post("newLevel");

        gameState.level += 1;
        buildLevel();

        // sceneObjects = [];

    }

    function  buildLevel(){
        rand = LCG(gameState.levelData[0].seed);  
        bag = new GrabBag(0,gameState.levelData[gameState.level].colors,5,rand); 
        for (let y = 0; y < height; y++) 
        for (let x = -1; x < 2; x++){
            for (let z = -1; z < 2; z++){
                if (x === 0 && z === 0 && !gameState.showCenter) continue;
                let rnum = bag.getRndNumber();
                let gem = new Gem(scene, eventBus, levelObjects, x,y,z, geometries[2], rnum);
                sceneObjects.push(gem);
                // level.object.add(gem.object);
            }
        }
    }

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        sceneObjects.forEach( obj => obj.update(elapsedTime) );

        // let removedObjects = sceneObjects.filter( subject => subject.del === true );

        sceneObjects = sceneObjects.filter( subject => subject.del === false );

        if (sceneObjects.length === 8 && gameState.gameState ==="playing"){gameState.gameState = "winner"};

        switch (gameState.gameState) {
            case "splash":
                // document.getElementById("scoreboard").classList.add("hidden");
                // document.getElementById("winner").classList.add("hidden");
                // document.getElementById("loser").classList.add("hidden");
                // document.getElementById("options").classList.add("hidden");
                // document.getElementById("instructions").classList.add("hidden");
                // document.getElementById("score").classList.add("hidden");

                hideAll();
                document.getElementById("splash").classList.remove("hidden");
            break;

            case "scoreboard":
                // document.getElementById("winner").classList.add("hidden");
                // document.getElementById("loser").classList.add("hidden");
                // document.getElementById("options").classList.add("hidden");
                // document.getElementById("splash").classList.add("hidden");   
                // document.getElementById("instructions").classList.add("hidden");
                // document.getElementById("score").classList.add("hidden");

                hideAll();
                document.getElementById("scoreboard").classList.remove("hidden");
            break;

            case "winner":
                // document.getElementById("scoreboard").classList.add("hidden");
                // document.getElementById("loser").classList.add("hidden");
                // document.getElementById("options").classList.add("hidden");
                // document.getElementById("splash").classList.add("hidden"); 
                // document.getElementById("instructions").classList.add("hidden");
                // document.getElementById("score").classList.add("hidden");

                hideAll();
                document.getElementById("winner").classList.remove("hidden");
            break;

            case "loser":
                // document.getElementById("scoreboard").classList.add("hidden");
                // document.getElementById("winner").classList.add("hidden");
                // document.getElementById("options").classList.add("hidden");
                // document.getElementById("splash").classList.add("hidden");   
                // document.getElementById("instructions").classList.add("hidden");
                // document.getElementById("score").classList.add("hidden");

                hideAll();
                document.getElementById("loser").classList.remove("hidden");
            break;

            case "options":
                // document.getElementById("scoreboard").classList.add("hidden");
                // document.getElementById("winner").classList.add("hidden");
                // document.getElementById("loser").classList.add("hidden");
                // document.getElementById("options").classList.remove("hidden");
                // document.getElementById("instructions").classList.add("hidden");
                // document.getElementById("score").classList.add("hidden");

                hideAll();
                document.getElementById("splash").classList.add("hidden");                
            break;
            
            case "instructions":
            // document.getElementById("scoreboard").classList.add("hidden");
            // document.getElementById("winner").classList.add("hidden");
            // document.getElementById("loser").classList.add("hidden");
            // document.getElementById("options").classList.add("hidden");
            // document.getElementById("splash").classList.add("hidden");
            // document.getElementById("score").classList.add("hidden");

            hideAll();
            document.getElementById("instructions").classList.remove("hidden");
            break;

            case "playing":
                // document.getElementById("scoreboard").classList.add("hidden");
                // document.getElementById("winner").classList.add("hidden");
                // document.getElementById("loser").classList.add("hidden");
                // document.getElementById("options").classList.add("hidden");
                // document.getElementById("splash").classList.add("hidden");
                // document.getElementById("instructions").classList.add("hidden");
                hideAll();
                document.getElementById("score").classList.remove("hidden");
            break;
            

            default:
            break;
        }

        renderer.render(scene, camera);
    }

    function hideAll(){
        document.getElementById("scoreboard").classList.add("hidden");
        document.getElementById("winner").classList.add("hidden");
        document.getElementById("loser").classList.add("hidden");
        document.getElementById("options").classList.add("hidden");
        document.getElementById("splash").classList.add("hidden");
        document.getElementById("instructions").classList.add("hidden");
        document.getElementById("score").classList.add("hidden");
    }

    function selectedBusCallback(){
        gameState.gemsSelected = gameState.gemsSelected + 1;;
    }

    function removedBusCallback(){
        // console.log("Number removed", gameState.gemsSelected );
        gameState.score += gameState.gemsSelected * gameState.gemsSelected;
        document.getElementById("scorevalue").innerText = gameState.score ;
        gameState.gemsSelected = 0;
    }

    function clearBusCallback(){
        gameState.gemsSelected = 0;
    }

    function newGemBusCallback(eventType, material, localPosition, globalPosition){
        let position = levelObjects[Math.round(globalPosition.y)].object.worldToLocal(globalPosition);

        let gem = new Gem(scene, eventBus, levelObjects, Math.round(position.x), Math.round(position.y), Math.round(position.z), geometries[2], material);
        sceneObjects.push(gem);
        levelObjects[Math.round(globalPosition.y)].object.add(gem.object);
    } 

    function infoBusCallback(){
        console.log("---  gamestate in call back ---")
        console.log(gameState);

        // clearLevel();

        console.log("--- sceneObject info ---");
        console.log(sceneObjects);

        console.log("--- eventBus info ---");
        // console.log(eventBus.eventObjects);
    }

    function dropGemsBusCallback(){
        // console.log("--- sceneObject info ---");
        // console.log(sceneObjects);

        // let tower = sceneObjects.filter( obj => obj.name = "Tower");
        let tower = sceneObjects[1]; // ???????  WILL THIS EVEER CHANGE ITS INDEX  ???????
        let levels = tower.object.children;
        let columns = { "-1,-1": [], "-1,0": [], "-1,1": [], "0,-1": [], "0,0": [], "0,1": [], "1,-1": [], "1,0": [], "1,1": [] };

        levels.forEach( (level, index) => {
            for (let x = -1; x < 2; x++ ){
                for (let z = -1; z < 2; z++){
                    if (x === 0 && z === 0 && !gameState.showCenter) continue;

                    let children = level.children;
                    let columnData = children.filter(c => c.name.split(",")[0] == x  && c.name.split(",")[2] == z );
                    if (columnData[0]) columns[x+','+z].push(columnData[0]);
                }  // z
            } // x
        }) // foreach
            
        for (var key in columns) {
            // skip loop if the property is from prototype
            if (!columns.hasOwnProperty(key)) continue;

            columns[key].forEach( (element, index) => eventBus.post(  element.uuid, "moveto", index));
        }        
    }

    // function infoBusCallback(){
    //     console.log("--- sceneObject info ---");
    //     // sceneObjects.forEach( object => console.log(object) );
    //     console.log(sceneObjects);

    //     console.log("--- eventBus info ---");
    //     console.log(eventBus.eventObjects);
    // }

    function columnInfoBusCallback(){
        console.log("--- sceneObject info ---");
        console.log(sceneObjects);

        // let tower = sceneObjects.filter( obj => obj.name = "Tower");
        let tower = sceneObjects[1]; // ???????  WILL THIS EVEER CHANGE ITS INDEX  ???????

        console.log("--- tower ---");
        console.log(tower);
        let levels = tower.object.children;

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
                    let columnData = children.filter(c => c.name.split(",")[0] == x  && c.name.split(",")[2] == z );
                    if (columnData[0]) columns[x+','+z].push(columnData[0]);
                
                }  // z
            } // x
        }) // foreach
            
        for (var key in columns) {
            // skip loop if the property is from prototype
            if (!columns.hasOwnProperty(key)) continue;

            columns[key].forEach( (element, index) => eventBus.post(  element.uuid, "moveto", index));
        }        
    }

    this.startButtonEvent = function(e){
        e.preventDefault();

        gameState.gameState = "playing";
        clearLevel();
        console.log("start button pressed!")
    }

    this.instructionsButtonEvent = function(e){
        e.preventDefault();

        gameState.gameState = "instructions";
        console.log("instructions button pressed!")
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
    
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
    
        mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;
    
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        (intersects.length > 0) ? intersects[0].object.callback(e) : console.log(sceneObjects);
        
    }


}