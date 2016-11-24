/**
 * Ball object for the 3D Pong
 * @constructor
 */

function Ball() {
    var vertices = [
        -0.1, -0.1, -0.1,
        0.1, -0.1, -0.1,
        0.1, 0.1, -0.1,
        -0.1, 0.1, -0.1,
        -0.1, -0.1, 0.1,
        0.1, -0.1, 0.1,
        0.1, 0.1, 0.1,
        -0.1, 0.1, 0.1
    ];

    var edges = [
        0, 1, 2, 0, 2, 3,  //front
        1, 5, 6, 1, 6, 2,  //right
        2, 6, 7, 2, 7, 3,  //top
        0, 3, 7, 0, 7, 4,  //left
        0, 4, 5, 0, 5, 1,  //bottom
        4, 7, 6, 4, 6, 5   //back
    ];

    var colors = [
        1,1,1,1,
        0.2, 0.2, 0.2, 1,
        1,1,1,1,
        0.2, 0.2, 0.2, 1,
        0.2, 0.2, 0.2, 1,
        1,1,1,1,
        0.2, 0.2, 0.2, 1,
        1,1,1,1
    ];

    var normalen = [
        1,0,0,
        0,1,0,
        0,0,1,
        -1,0,0,
        0,-1,0,
        0,0,-1
    ];

    this.modelMatrix = mat4.create();

    this.vertexBuffer = new ArrayBuffer(vertices,3);

    this.edgeBuffer = new ElementArrayBuffer(edges);

    this.colorBuffer = new ArrayBuffer(colors,4);

    this.normalenBuffer = new ArrayBuffer(normalen,3);
}

/**
 * rotates the ball around the x,y and z axis.
 *
 * @param rotationMatrix - the matrix to rotate.
 * @param deltaTime
 */
Ball.prototype.rotate = function (rotationMatrix, deltaTime) {
    mat4.rotate(rotationMatrix, rotationMatrix,deltaTime*0.002, [1, 0, 0]);
    mat4.rotate(rotationMatrix, rotationMatrix,deltaTime*0.001, [0, 0, 1]);
    mat4.rotate(rotationMatrix, rotationMatrix,deltaTime*0.0005, [0, 1, 0]);
};

/**
 * moves the ball in R3 around.
 *
 * @param translationMatrix - the matrix to translate.
 * @param deltaTime
 */
//@TODO implement functionality of move
Ball.prototype.move = function (translationMatrix, deltaTime) {

};

/**
 * resize the ball object.
 *
 * @param scalingMatrix - the matrix to be scaled
 * @param deltaTime
 */
//@TODO implement functionality of resize
Ball.prototype.resize = function (scalingMatrix, deltaTime) {

};

/**
 * enables the color and position in the GL environment.
 *
 * @param colorAttributeName - name of the color attribute
 * @param positionAttributeName - name of the position attribute
 */
Ball.prototype.enable = function (colorAttributeName, positionAttributeName, normalenAttributeName) {
    this.vertexBuffer.bind();
    var attributeID = shaderProgram.attributeIDs[positionAttributeName];
    gl.vertexAttribPointer( attributeID, this.vertexBuffer.contentElements , gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( attributeID );

    this.colorBuffer.bind();
    attributeID = shaderProgram.attributeIDs[colorAttributeName];
    gl.vertexAttribPointer( attributeID, this.colorBuffer.contentElements, gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( attributeID );

    this.normalenBuffer.bind();
    attributeID = shaderProgram.attributeIDs[normalenAttributeName];
    gl.vertexAttribPointer( attributeID, this.normalenBuffer.contentElements, gl.FLOAT, false,0,0);
};

/**
 * draws the object.
 *
 * @param deltaTime - past time since last draw
 */
Ball.prototype.draw = function () {
    this.edgeBuffer.bind();
    gl.drawElements(gl.TRIANGLES , this.edgeBuffer.length , gl.UNSIGNED_SHORT , 0);
};

Ball.prototype.setLights = function () {
    var lightPositionEye = vec3.create();

}