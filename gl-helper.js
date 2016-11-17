/**
 * a collection of generic methods
 */

//@TODO define a general object with methods to draw...
//
// function setUpAttributes(){
//     "use strict";
//
//     shaderProgram.aVertexPositionId = gl.getAttribLocation(shaderProgram, "aVertexPosition");
//     shaderProgram.uColorPositionId = gl.getUniformLocation(shaderProgram, "uColor");
//     shaderProgram.aColorPositionId = gl.getAttribLocation(shaderProgram, "aColor");
//     shaderProgram.uModelViewMatrixID = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
//     shaderProgram.uProjectionMatrixID = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
//
// }

function setUpUniforms( uniformNames ) {
    uniformNames.forEach( function (entry) {
            shaderProgram.uniforms[entry] = gl.getUniformLocation(shaderProgram, entry)
        }
    );
}

function setUpAttributes (attributeNames ){
    attributeNames.forEach(function (entry) {
            shaderProgram.attributes[entry] = gl.getAttribLocation(shaderProgram, entry)
        }
    )
}

function setUpArrayBuffers(bufferContent){
    "use strict";

    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferContent),gl.STATIC_DRAW);

    return buffer;
}

function setUpElementBuffer(bufferContent) {
    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER , new Uint16Array ( bufferContent ), gl.STATIC_DRAW ) ;

    return buffer;
}

function drawStrip(bufferPos,bufferColor, numberOfVectors){
    enablePositionBuffer(bufferPos,numberOfVectors);
    enableColorBuffer(bufferColor);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}

function drawTriangles(edgeBuffer, vertexBuffer) {
    enableBuffer(vertexBuffer,3);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
    gl.drawElements(gl.TRIANGLES, edgeBuffer.length, gl.UNSIGNED_SHORT, 0);
}

function drawLine(bufferPos){
    enablePositionBuffer(bufferPos, 2);
    gl.lineWidth = .5;
    gl.drawArrays(gl.LINES,0,2)
}jf

function drawCircle(bufferPosition){
    enablePositionBuffer(bufferPosition, 4);

    gl.drawArrays(gl.LINE_LOOP,0,16);
}

function enableBuffer(attributeID, buffer, n){
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer( attributeID, n , gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( attributeID );
}

function enableColorBuffer(bufferColor) {
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColor);
    gl.vertexAttribPointer( shaderProgram.aColorPositionId, 4, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(shaderProgram.aColorPositionId);
}