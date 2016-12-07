/**
 * created by Danile Föhn.
 */
function Sphere(latitudeBands, longitudeBands) {
    "use strict";
    // define the vertices of the sphere
    var vertices = [];
    var normals = [];

    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;

            // texture coordinates (not used)
            // var u = 1 - (longNumber / longitudeBands);
            // var v = 1 - (latNumber / latitudeBands);

            vertices.push(x);
            vertices.push(y);
            vertices.push(z);

            normals.push(x);
            normals.push(y);
            normals.push(z);
        }
    }

    var indices = [];
    for (latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (longNumber = 0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;

            indices.push(first);
            indices.push(first + 1);
            indices.push(second);

            indices.push(second);
            indices.push(first + 1);
            indices.push(second + 1);
        }
    }

    this.modelMatrix = mat4.create();

    this.normalBuffer = new ArrayBuffer(normals,3);

    this.vertexBuffer = new ArrayBuffer(vertices,3);

    this.edgeBuffer = new ElementArrayBuffer(indices);

    this.numberOfTriangles = latitudeBands*longitudeBands*2;
}

Sphere.prototype.enable = function (aVertexPositionId,aVertexColorId,aVertexNormalId) {
    "use strict";
    // bind the buffers
    this.vertexBuffer.bind();
    var attributeID = shaderProgram.attributeIDs[aVertexPositionId];
    gl.vertexAttribPointer(attributeID, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attributeID);

    attributeID = shaderProgram.attributeIDs[aVertexColorId];
    // color is directly specified as an attribute here, as it is valid for the whole object
    gl.disableVertexAttribArray(attributeID);
    gl.vertexAttrib3f(attributeID, 1,0,1);

    attributeID = shaderProgram.attributeIDs[aVertexNormalId];
    // bind the buffer for normal
    if (attributeID != undefined) {
        this.normalBuffer.bind()
        gl.vertexAttribPointer(attributeID, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attributeID);
    }
};

Sphere.prototype.draw = function (colorID,positionID,normalID) {
    this.enable(positionID,colorID,normalID);
    this.edgeBuffer.bind();
    gl.drawElements(gl.TRIANGLES, this.numberOfTriangles*3 ,gl.UNSIGNED_SHORT, 0);
};

Sphere.prototype.setModelViewMatrix = function (matrix) {
    this.modelMatrix = matrix;
};