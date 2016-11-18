/**
 * generates the ID for each uniform given by the array of names.
 *
 * @param uniformNames - array of uniform names.
 */
function setUpUniforms( uniformNames ) {
    uniformNames.forEach( function (entry) {
            shaderProgram.uniformIDs[entry] = gl.getUniformLocation(shaderProgram, entry)
        }
    );
}

/**
 * generates the ID for each attribute given by names.
 *
 * @param attributeNames - array of attribute names.
 */
function setUpAttributes (attributeNames ){
    attributeNames.forEach(function (entry) {
            shaderProgram.attributeIDs[entry] = gl.getAttribLocation(shaderProgram, entry)
        }
    )
}

//@TODO move to seperate file
function drawStrip(formattedPositionBuffer, formattedColorBuffer){
    enableBuffer(shaderProgram.glAttributes[attributeNames[0]],bufferPos,numberOfVectors);
    enableBuffer(shaderProgram.glAttributes[attributeNames[0]],bufferColor,numberOfVectors);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}

//@TODO move to seperate file
function drawTriangles(attributeName, edgeBuffer, vertexBuffer) {
    enableBuffer(shaderProgram.glAttributes[attributeName], vertexBuffer,3);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
    gl.drawElements(gl.TRIANGLES, edgeBuffer.length, gl.UNSIGNED_SHORT, 0);
}

//@TODO move to seperate file
function drawLine(attributeName, bufferPos){
    enableBuffer(shaderProgram.glAttributes[attributeName], bufferPos, 2);
    gl.lineWidth = .5;
    gl.drawArrays(gl.LINES,0,2)
}

//@TODO move to seperate file
function drawCircle(attributeName, bufferPosition, verticesCount){
    enableBuffer(shaderProgram.glAttributes[attributeName], bufferPosition, 4);
    gl.drawArrays(gl.LINE_LOOP,0,verticesCount);
}