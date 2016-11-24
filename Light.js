function Light() {
    this.sunset = [
        0,0,3
    ];

    this.highnoon = [
        0,3,0
    ];

    this.dawn = [
        3,0,0
    ];
}

Light.prototype.setSunsetLights = function (cameraMatrix,uniformName) {
    var lightPositionEye = vec3.create();
    vec3.transformMat4( lightPositionEye , this.sunset , cameraMatrix );
    gl.uniform3fv( shaderProgram.uniformIDs[uniformName] , lightPositionEye ) ;
};

Light.prototype.setDawn = function (cameraMatrix,uniformName) {
    var lightPositionEye = vec3.create();
    vec3.transformMat4( lightPositionEye , this.dawn , cameraMatrix );
    gl.uniform3fv( shaderProgram.uniformIDs[uniformName] , lightPositionEye ) ;
};

Light.prototype.setHighNoon = function (cameraMatrix,uniformName) {
    var lightPositionEye = vec3.create();
    vec3.transformMat4( lightPositionEye , this.highnoon , cameraMatrix );
    gl.uniform3fv( shaderProgram.uniformIDs[uniformName] , lightPositionEye ) ;
};