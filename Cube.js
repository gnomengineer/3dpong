/**
 * Ball object for the 3D Pong
 * @constructor
 */

function Cube() {
    var vertices = [
        //TOP
        -0.2, -0.2,  0.2,
        0.2, -0.2,  0.2,
        0.2,  0.2,  0.2,
        -0.2,  0.2,  0.2,

        //BOTTOM
        -0.2, -0.2, -0.2,
        -0.2,  0.2, -0.2,
        0.2,  0.2, -0.2,
        0.2, -0.2, -0.2,

        //BACK
        -0.2,  0.2, -0.2,
        -0.2,  0.2,  0.2,
        0.2,  0.2,  0.2,
        0.2,  0.2, -0.2,

        //FRONT
        -0.2, -0.2, -0.2,
        0.2, -0.2, -0.2,
        0.2, -0.2,  0.2,
        -0.2, -0.2,  0.2,

        //RIGHT
        0.2, -0.2, -0.2,
        0.2,  0.2, -0.2,
        0.2,  0.2,  0.2,
        0.2, -0.2,  0.2,

        //LEFT
        -0.2, -0.2, -0.2,
        -0.2, -0.2,  0.2,
        -0.2,  0.2,  0.2,
        -0.2,  0.2, -0.2
    ];

    var edges = [
        0,  1,  2,      0,  2,  3,    // oben
        4,  5,  6,      4,  6,  7,    // unten
        8,  9,  10,     8,  10, 11,   // hinten
        12, 13, 14,     12, 14, 15,   // vorne
        16, 17, 18,     16, 18, 19,   // rechts
        20, 21, 22,     20, 22, 23    // links
    ];

    var topColor = [1.0, 0.0, 0.0],
        bottomColor = [0.0, 0.0, 1.0],
        backColor = [0.0, 1.0, 0.0],
        frontColor = [1.0, 1.0, 0.0],
        rightColor = [1.0, 0.0, 1.0],
        leftColor = [0.0, 1.0, 1.0];

    var topSide = topColor.concat(topColor, topColor, topColor);
    var bottomSide = bottomColor.concat(bottomColor, bottomColor, bottomColor);
    var backSide = backColor.concat(backColor, backColor, backColor);
    var frontSide = frontColor.concat(frontColor, frontColor, frontColor);
    var rightSide = rightColor.concat(rightColor, rightColor, rightColor);
    var leftSide = leftColor.concat(leftColor, leftColor, leftColor);


    var allSides = topSide.concat(bottomSide, backSide, frontSide, rightSide, leftSide);

    var normalen = [
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,
        0.0,  0.0,  -1.0,

        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,

        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,

        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,

        1.0, 0.0,  0.0,
        1.0, 0.0,  0.0,
        1.0, 0.0,  0.0,
        1.0, 0.0,  0.0,

        -1.0,  0.0, 0.0,
        -1.0,  0.0, 0.0,
        -1.0,  0.0, 0.0,
        -1.0,  0.0, 0.0
    ];

    this.modelMatrix = mat4.create();

    this.vertexBuffer = new ArrayBuffer(vertices,3);

    this.edgeBuffer = new ElementArrayBuffer(edges);

    this.colorBuffer = new ArrayBuffer(allSides,3);

    this.normalenBuffer = new ArrayBuffer(normalen,3);
}

/**
 * rotates the cube around the x,y and z axis.
 *
 * @param rotationMatrix - the matrix to rotate.
 * @param deltaTime
 */
Cube.prototype.rotate = function (rotationMatrix, deltaTime) {
    mat4.rotate(rotationMatrix, rotationMatrix,deltaTime*0.002, [1, 0, 0]);
    mat4.rotate(rotationMatrix, rotationMatrix,deltaTime*0.001, [0, 0, 1]);
    mat4.rotate(rotationMatrix, rotationMatrix,deltaTime*0.0005, [0, 1, 0]);
};

/**
 * moves the cube in R3 around.
 *
 * @param translationMatrix - the matrix to translate.
 * @param deltaTime
 */
Cube.prototype.move = function (deltaMove, deltaTime) {
    mat4.translate(this.modelMatrix,this.modelMatrix,deltaMove);
};

/**
 * resize the cube object.
 *
 * @param scalingMatrix - the matrix to be scaled
 * @param deltaTime
 */
//@TODO implement functionality of resize
Cube.prototype.resize = function (scalingMatrix, deltaTime) {

};

/**
 * enables the color and position in the GL environment.
 *
 * @param colorAttributeName - name of the color attribute
 * @param positionAttributeName - name of the position attribute
 */
Cube.prototype.enable = function (colorAttributeName, positionAttributeName, normalenAttributeName) {
    this.vertexBuffer.bind();
    var attributeID = shaderProgram.attributeIDs[positionAttributeName];
    gl.vertexAttribPointer( attributeID, 3 , gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( attributeID );

    this.colorBuffer.bind();
    attributeID = shaderProgram.attributeIDs[colorAttributeName];
    gl.vertexAttribPointer( attributeID, 3, gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( attributeID );

    this.normalenBuffer.bind();
    attributeID = shaderProgram.attributeIDs[normalenAttributeName];
    gl.vertexAttribPointer( attributeID, 3, gl.FLOAT, false,0,0);
};

/**
 * draws the object.
 *
 * @param deltaTime - past time since last draw
 */
Cube.prototype.draw = function (colorID,positionID,normalID) {
    this.enable(colorID,positionID,normalID);
    this.edgeBuffer.bind();
    gl.drawElements(gl.TRIANGLES , 36 , gl.UNSIGNED_SHORT , 0);
};

Cube.prototype.setLights = function () {
    var lightPositionEye = vec3.create();

};

Cube.prototype.setModelViewMatrix = function (matrix) {
    this.modelMatrix = matrix;
};