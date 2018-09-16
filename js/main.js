
const canvas = document.getElementById("canvas");

const sceneManager = new SceneManager(canvas);

bindEventListeners();
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;
    window.onclick = mainListener;

    resizeCanvas();	
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}

function mainListener(e){
    sceneManager.mainListener(e);
}

function render() {
    sceneManager.update();
    requestAnimationFrame(render);
}