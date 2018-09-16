
const canvas = document.getElementById("canvas");

const gameManager = new GameManager(canvas);

bindEventListeners();
resizeCanvas();	
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;
    window.onclick = mainListener;
    window.oncontextmenu = mainListener;
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    gameManager.onWindowResize();
}

function mainListener(event){
    gameManager.mainListener(event);
}

function render() {
    gameManager.update();
    requestAnimationFrame(render);
}