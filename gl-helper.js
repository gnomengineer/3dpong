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
            shaderProgram.glAttributes[entry] = gl.getAttribLocation(shaderProgram, entry)
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

/**
 *
 * @param attributeName
 * @param edgeBuffer
 * @param vertexBuffer
 */
function drawTriangles(attributeName, edgeBuffer, vertexBuffer) {
    enableBuffer(shaderProgram.glAttributes[attributeName], vertexBuffer,3);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
    gl.drawElements(gl.TRIANGLES, edgeBuffer.length, gl.UNSIGNED_SHORT, 0);
}

/**
 * draws a line between the points in the given buffer.
 *
 * @param attributeName
 * @param bufferPos
 */
function drawLine(attributeName, bufferPos){
    enableBuffer(shaderProgram.glAttributes[attributeName], bufferPos, 2);
    gl.lineWidth = .5;
    gl.drawArrays(gl.LINES,0,2)
}

/**
 * draws a circle with the given points in the buffer.
 *
 * @param attributeName - name of the target gl attribute
 * @param bufferPosition - buffer with positions in it
 * @param verticesCount - number of positions
 */
function drawCircle(attributeName, bufferPosition, verticesCount){
    enableBuffer(shaderProgram.glAttributes[attributeName], bufferPosition, 4);
    gl.drawArrays(gl.LINE_LOOP,0,verticesCount);
}

/**
 * enables the given buffer onto the given attribute.
 *
 * @param attributeID - target attributeID
 * @param buffer - gl buffer
 * @param n - amount of vertices
 */
function enableBuffer(attributeID, buffer, n){
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer( attributeID, n , gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( attributeID );
}