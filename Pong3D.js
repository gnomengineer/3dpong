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
    setupAttributes();
    setupControl();
    //@TODO generate a ball object
    drawAnimated(0);
    //
}

var time_old = 0;
function drawAnimated ( timeStamp ) {
    var dt=timeStamp-time_old;


    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //@TODO use the ball object.
    //Transformation
    mat4.rotate(ModelViewmatrix, ModelViewmatrix,dt*0.002, [1, 0, 0]);
    mat4.rotate(ModelViewmatrix, ModelViewmatrix,dt*0.001, [0, 0, 1]);
    mat4.rotate(ModelViewmatrix, ModelViewmatrix,dt*0.0005, [0, 1, 0]);
    gl.uniformMatrix4fv(uModelViewMatrixId, false, ModelViewmatrix);

    //Projection
    projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, -1, 1, -1, 1, 0.1, 100);
    gl.uniformMatrix4fv(uProjectionMatrixId, false, projectionMatrix);

    //Camera
    camera = mat4.create();
    mat4.lookAt(camera, [1, 1, 0], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(uCameraMatrixId, false, camera);

    time_old = timeStamp;

    //@TODO use draw method of the specific object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
    gl.drawElements(gl.TRIANGLES , 36 , gl.UNSIGNED_SHORT , 0);

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

function setupAttributes () {
    // finds the index of the variable in the program
    aVertexPositionId = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    aVertexColorId = gl.getAttribLocation(shaderProgram, "aVertexColor");

    uProjectionMatrixId = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
    uCameraMatrixId = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
    uModelViewMatrixId = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
}

function setupControl() {

    //color for each corner
    var colors = [
        1,1,1,1,
        0.2, 0.2, 0.2, 1,
        1,1,1,1,
        0.2, 0.2, 0.2, 1,
        0.2, 0.2, 0.2, 1,
        1,1,1,1,
        0.2, 0.2, 0.2, 1,
        1,1,1,1];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    //Color
    gl.vertexAttribPointer (aVertexColorId, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexColorId) ;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    //corners of cube
    var vertices = [
        -1 ,-1 ,-1, // v0
        1 ,-1 ,-1 , // v1
        1 ,1 ,-1 ,  // v2
        -1 ,1 ,-1 , // v3
        -1 ,-1 ,1 , // v4
        1 ,-1 ,1 ,  // v5
        1 ,1 ,1 ,   // v6
        -1 ,1 ,1    //v7
    ];
    vertexBuffer = gl.createBuffer();
    //Position
    gl.bindBuffer(gl.ARRAY_BUFFER , vertexBuffer);
    gl.vertexAttribPointer(aVertexPositionId , 3, gl.FLOAT ,false ,0 ,0);
    gl.enableVertexAttribArray(aVertexPositionId) ;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexIndices = [
        0 ,1, 2, 0, 2, 3,  //front
        1 ,5, 6, 1, 6, 2,  //right
        2, 6, 7, 2, 7, 3,  //top
        0, 3, 7, 0, 7, 4,  //left
        0, 4, 5, 0, 5, 1,  //bottom
        4, 7, 6, 4, 6, 5   //back
    ];
    edgeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER , edgeBuffer) ;
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER , new Uint16Array(vertexIndices) , gl.STATIC_DRAW) ;

}

var transform = mat4.create();
function draw () {




}





