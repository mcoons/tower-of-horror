
const canvas = document.getElementById("canvas");

const gameManager = new GameManager(canvas);

bindEventListeners();
resizeCanvas();	
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;

    document.getElementById("canvas").addEventListener("click", mainListener);
    document.getElementById("canvas").addEventListener("dblclick", function (e){e.preventDefault();console.log("dbl click")});
    document.getElementById("canvas").addEventListener("contextmenu", function (e){e.preventDefault();console.log("rt click")});

    Array.from(document.querySelectorAll(".startbutton")).forEach(element => {
        element.addEventListener("click", gameManager.startButtonEvent);
    });
    document.getElementById("instructionsbutton").addEventListener("click", gameManager.instructionsButtonEvent);
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    gameManager.onWindowResize();
}

function clickTest(event){
    console.log("test click");
}

function mainListener(event){
    gameManager.mainListener(event);
}

function render() {
    gameManager.update();
    requestAnimationFrame(render);
}