//
// Computer Graphics 
//
// Uebung 3: WebGL
//
window.onload = startup ;
window.keys= [];
window.onkeyup = function(e) {
    keys[e.keyCode]=false;
};
window.onkeydown = function(e) {
    keys[e.keyCode]=true;
};
var canvas;
var gl;
var shaderProgram;

var uProjectionMatrixId;
var uCameraMatrixId;
var uModelViewMatrixId;

var ModelViewmatrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

var aVertexPositionId;
var aVertexColorId;

var colorBuffer;
var vertexBuffer;
var edgeBuffer;

function startup () {
    canvas = document.getElementById("gameCanvas");
    gl = createGLContext(canvas);
    initGL();
    //setupAttributes();
    setUpAttributes(["aVertexColor","aVertexPosition"]);
    setUpUniforms(["uProjectionMatrix","uCameraMatrix","uModelViewMatrix"]);
    //setupControl();
    ball = new Ball();
    ball.enable("aVertexColor","aVertexPosition");
    drawAnimated(0);
    //
}

var time_old = 0;
function drawAnimated ( timeStamp ) {
    var dt=timeStamp-time_old;


    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //Transformation
    ball.rotate(ball.modelViewMatrix,dt);
    gl.uniformMatrix4fv(shaderProgram.uniformIDs["uModelViewMatrix"],false,ball.modelViewMatrix);

    //Projection
    projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, -1, 1, -1, 1, 0.1, 100);
    gl.uniformMatrix4fv(shaderProgram.uniformIDs["uProjectionMatrix"], false, projectionMatrix);

    //Camera
    camera = mat4.create();
    mat4.lookAt(camera, [1, 1, 0], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(shaderProgram.uniformIDs["uCameraMatrix"], false, camera);

    time_old = timeStamp;

    ball.draw();

    window.requestAnimationFrame(drawAnimated);


}

function rotateX(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv1 = m[1], mv5 = m[5], mv9 = m[9];

    m[1] = m[1]*c-m[2]*s;
    m[5] = m[5]*c-m[6]*s;
    m[9] = m[9]*c-m[10]*s;

    m[2] = m[2]*c+mv1*s;
    m[6] = m[6]*c+mv5*s;
    m[10] = m[10]*c+mv9*s;
}

function initGL() {
    shaderProgram = loadAndCompileShaders(gl, 'VertexShader.shader', 'FragmentShader.shader');
    gl.frontFace(gl.CCW); // defines how the front face is drawn
    gl.cullFace(gl.BACK); // defines which face should be culled
    gl.enable(gl.CULL_FACE); // enables culling
    gl.clearColor(0, 0, 0, 1.0);
    gl.viewport(0, 0, 500, 500);
}

var transform = mat4.create();
function draw () {




}





