/**
 * Ball object for the 3D Pong
 * @constructor
 */

function Ball() {
    var vertices = [
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5
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

    this.vertexBuffer = new ArrayBuffer(vertices);

    this.edgeBuffer = new ElementArrayBuffer(edges);

    this.colorBuffer = new ArrayBuffer(colors);
}

Ball.prototype.rotate = function (deltaTime) {

};

Ball.prototype.move = function (deltaTime) {

};

Ball.prototype.resize = function (deltaTime) {

};

/**
 * enables the color and position in the GL environment.
 *
 * @param colorAttributeName - name of the color attribute
 * @param positionAttributeName - name of the position attribute
 */
Ball.prototype.enable = function (colorAttributeName, positionAttributeName) {
    this.vertexBuffer.bind();
    var attributeID = shaderProgram.attributeIDs[positionAttributeName];
    gl.vertexAttribPointer( attributeID, this.vertexBuffer.length , gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( attributeID );

    this.colorBuffer.bind();
    attributeID = shaderProgram.attributeIDs[colorAttributeName];
    gl.vertexAttribPointer( attributeID, this.colorBuffer.length , gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( attributeID );
};

/**
 * draws the object.
 *
 * @param deltaTime - past time since last draw
 */
Ball.prototype.draw = function (deltaTime) {
    this.edgeBuffer.bind();
    gl.drawElements(gl.TRIANGLES , this.edgeBuffer.length , gl.UNSIGNED_SHORT , 0);
}