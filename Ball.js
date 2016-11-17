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

    this.vertexBuffer = setUpArrayBuffers(vertices);

    this.edgeBuffer = setUpElementBuffer(edges);

    this.getEdgesLength = function () {
        return edges.length;
    }
}

Ball.prototype.rotate = function (deltaTime) {

};

Ball.prototype.move = function (deltaTime) {

};

Ball.prototype.resize = function (deltaTime) {

};