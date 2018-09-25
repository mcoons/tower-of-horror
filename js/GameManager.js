
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


    const apiurl = "https://agile-citadel-53491.herokuapp.com/api";

    window.scene = scene;

    fetch(apiurl)
    .then(response => response.json())
    .then(response => gameState.scores = response.scores)
    .then(() => buildScoreList())

    // console.log("---  gamestate in global ---")
    // console.log(gameState);

    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }

    eventBus.subscribe("info", infoBusCallback);
    eventBus.subscribe("newGem", newGemBusCallback);
    eventBus.subscribe("dropGems", dropGemsBusCallback);
    eventBus.subscribe("selected", selectedBusCallback);
    eventBus.subscribe('removed', removedBusCallback);
    eventBus.subscribe('clear', clearBusCallback);
    eventBus.subscribe('animationEnded', animationEndedBusCallback);
    eventBus.subscribe('explosion', explosionBusCallback);


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
        camera.position.set(0,2.5,10);

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

        while (scorelist.firstChild) {
            scorelist.removeChild(scorelist.firstChild);
        }

        for(s = 0; s < 5; s++){
            let recorddiv = document.createElement("div");
            // recorddiv.id = "recorddiv";
            recorddiv.classList.add("recorddiv");

            let namediv = document.createElement("div");
            namediv.innerText = gameState.scores[s].initials.toUpperCase();
            
            let leveldiv = document.createElement("div");
            leveldiv.innerText = "lvl"+gameState.scores[s].level;
            
            let scorediv = document.createElement("div");
            scorediv.innerText = gameState.scores[s].score;
            
            recorddiv.append( namediv );
            recorddiv.append( leveldiv );
            recorddiv.append( scorediv );
            
            scorelist.append( recorddiv );
        }

        if (gameState.level >= 0){

            let h2 = document.createElement("h3");
            h2.innerText = "Your Current Score"

            let recorddiv = document.createElement("div");
            // recorddiv.id = "recorddiv";
            recorddiv.classList.add("recorddiv");

            let namediv = document.createElement("div");
            namediv.innerText = gameState.initials;
            
            let leveldiv = document.createElement("div");
            leveldiv.innerText = "lvl" + (gameState.level + 1);
            
            let scorediv = document.createElement("div");
            scorediv.innerText = gameState.score;

            recorddiv.append( namediv );
            recorddiv.append( leveldiv );
            recorddiv.append( scorediv );
            scorelist.append( h2 );
            scorelist.append( recorddiv );

            
        }
    }


    document.getElementById("savebutton").addEventListener("click",submitForm);
    document.getElementById("playagainbutton").addEventListener("click",restart);


    function restart(){
        window.location.reload();
    }

    function clearLevel(){
        eventBus.post("newLevel");
        infoBusCallback();

        if (gameState.level < 20)
            gameState.level += 1;
        buildLevel();
    }

    function  buildLevel(){
        gameState.colorCount = [0,0,0,0,0,0,0,0];
        rand = LCG(gameState.levelData[gameState.level].seed);  
        bag = new GrabBag(0,gameState.levelData[gameState.level].colors,gameState.levelData[gameState.level].dups,rand); 

        for (let y = 0; y < height; y++) 
        for (let x = -1; x < 2; x++){
            for (let z = -1; z < 2; z++){
                if (x === 0 && z === 0 && !gameState.showCenter) continue;
                let rnum = bag.getRndNumber();
                gameState.colorCount[rnum]++;
                let gem = new Gem(scene, eventBus, gameState, levelObjects, x,y,z, geometries[2], rnum);
                sceneObjects.push(gem);
            }
        }
    }

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        if (gameState.gameState === "playing")
        sceneObjects.forEach( obj => obj.update(elapsedTime) );

        sceneObjects = sceneObjects.filter( subject => subject.del === false );

        if (sceneObjects.length === 8 && gameState.gameState ==="playing"){
            gameState.gameState = "winner";
        };

        if (gameState.gameState != gameState.lastState){ 

            gameState.lastState = gameState.gameState;

            hideAll();

            switch (gameState.gameState) {
                case "splash":
                    document.getElementById("startbutton").innerText = 
                        (gameState.level >= 0) ? "Next Level" : "Start";
                    document.getElementById("splash").classList.remove("hidden");
                break;

                case "winner":
                    document.querySelector("#winner h1").innerText = `Level ${gameState.level+ 1} completed.`;
                    document.getElementById("winner").classList.remove("hidden");
                break;

                case "loser":
                    document.getElementById("loser").classList.remove("hidden");
                break;

                case "options":
                    document.getElementById("splash").classList.add("hidden");                
                break;
                
                case "instructions":
                    document.getElementById("instructions").classList.remove("hidden");
                break;

                case "playing":
                    document.getElementById("score").classList.remove("hidden");
                break;
                

                default:
                break;
            }
        }
        renderer.render(scene, camera);
    }

    function hideAll(){
        // document.getElementById("scoreboard").classList.add("hidden");
        document.getElementById("winner").classList.add("hidden");
        document.getElementById("loser").classList.add("hidden");
        document.getElementById("options").classList.add("hidden");
        document.getElementById("splash").classList.add("hidden");
        document.getElementById("instructions").classList.add("hidden");
        // document.getElementById("score").classList.add("hidden");
    }

    function selectedBusCallback(){
        gameState.gemsSelected = gameState.gemsSelected + 1;
        
    }

    function removedBusCallback(eventType, material, position){
        let explosion = new Explosion(scene, eventBus, gameState, position.x, position.y, position.z, material);
        sceneObjects.push(explosion);
        gameState.score += gameState.gemsSelected * gameState.gemsSelected * (gameState.level+1);
        document.getElementById("scorevalue").innerText = gameState.score ;
        gameState.colorCount[material]-= gameState.gemsSelected;
        gameState.gemsSelected = 0;
        gameOverCheck();
    }

    function explosionBusCallback(eventType, material, position){
        let explosion = new Explosion(scene, eventBus, gameState, position.x, position.y, position.z, material);
        sceneObjects.push(explosion);
    
    }

    function clearBusCallback(){
        gameState.gemsSelected = 0;
    }

    function newGemBusCallback(eventType, material, localPosition, globalPosition){
        let position = levelObjects[Math.round(globalPosition.y)].object.worldToLocal(globalPosition);

        let gem = new Gem(scene, eventBus, gameState, levelObjects, Math.round(position.x), Math.round(position.y), Math.round(position.z), geometries[2], material);
        sceneObjects.push(gem);
        levelObjects[Math.round(globalPosition.y)].object.add(gem.object);
    } 

    function infoBusCallback(){
        console.log("---  gamestate in call back ---")
        console.log(gameState);

        console.log("--- color counts ===");
        console.log(gameState.colorCount);

        console.log("--- sceneObject info ---");
        console.log(sceneObjects);

        console.log("--- scene children ---");
        console.log(scene.children);

        console.log("--- eventBus info ---");
        console.log(eventBus.eventObjects);

        // gameOverCheck();
    }

    function dropGemsBusCallback(){
        let tower = sceneObjects[1]; // ???????  WILL THIS EVER CHANGE ITS INDEX  ???????
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

            columns[key].forEach( (element, index) => setTimeout( function(){ eventBus.post(  element.uuid, "moveto", index)}, 200));
// columns[key].forEach( (element, index) => eventBus.post(  element.uuid, "moveto", index));

        
        
        }        
    }

    // function columnInfoBusCallback(){
    //     console.log("--- sceneObject info ---");
    //     console.log(sceneObjects);

    //     // let tower = sceneObjects.filter( obj => obj.name = "Tower");
    //     let tower = sceneObjects[1]; // ???????  WILL THIS EVEER CHANGE ITS INDEX  ???????

    //     console.log("--- tower ---");
    //     console.log(tower);
    //     let levels = tower.object.children;

    //     let columns = {
    //         "-1,-1": [],
    //         "-1,0": [],
    //         "-1,1": [],
    //         "0,-1": [],
    //         "0,0": [],
    //         "0,1": [],
    //         "1,-1": [],
    //         "1,0": [],
    //         "1,1": []
    //     };

    //     levels.forEach( (level, index) => {
    //         for (let x = -1; x < 2; x++ ){
    //             for (let z = -1; z < 2; z++){
    //                 if (x === 0 && z === 0) continue;

    //                 let children = level.children;
    //                 let columnData = children.filter(c => c.name.split(",")[0] == x  && c.name.split(",")[2] == z );
    //                 if (columnData[0]) columns[x+','+z].push(columnData[0]);
                
    //             }  // z
    //         } // x
    //     }) // foreach
            
    //     for (var key in columns) {
    //         // skip loop if the property is from prototype
    //         if (!columns.hasOwnProperty(key)) continue;

    //         columns[key].forEach( (element, index) => eventBus.post(  element.uuid, "moveto", index));
    //     }        
    // }

    this.startButtonEvent = function(e){
        e.preventDefault();

        gameState.gameState = "playing";
        clearLevel();
    }

    this.instructionsButtonEvent = function(e){
        e.preventDefault();

        gameState.gameState = "instructions";
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

    function submitForm(event){
        if (!document.getElementById("initials").value) return;

        event.preventDefault();

        gameState.initials = document.getElementById("initials").value.toUpperCase();
        
        var postObject = {  
            'initials': document.getElementById("initials").value.toUpperCase(),
            'level': (gameState.level+1),
            'score': gameState.score
        };
        var postOptions = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(postObject)
        };

        fetch(apiurl, postOptions)
        .then(response => response.json())
        .catch(error => console.error("ERROR: ",error));

        gameState.lastScore = gameState.score;
        insertScore(postObject);

        gameState.gameState = "splash";
        buildScoreList();

    }

    function insertScore(newScore){

        if (newScore.score > gameState.scores[0].score) {
            gameState.scores.unshift(newScore);
            return;
        }

        if (newScore.score < gameState.scores[gameState.scores.length-1].score) {
            gameState.scores.push(newScore);
            return;
        }

        for (var i = 0, len = gameState.scores.length; i < len; i++) {
            if (newScore.score > gameState.scores[i].score) {
                gameState.scores.splice(i, 0, newScore);
                break;
            }
        }
        
    }

    function animationEndedBusCallback(){
        gameOverCheck();
    }

    function gameOverCheck(){
        gameOver = false;

        for (let index = 0; index <= gameState.levelData[gameState.level].colors; index++) {
            if (gameState.colorCount[index] === 1){
                gameOver = true;
                gameState.gameState = "loser";
            }
        }
    }


}