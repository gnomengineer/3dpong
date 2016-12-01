function Light() {
    this.sunset = [
        0,0,1
    ];

    this.highnoon = [
        0,2,0
    ];

    this.dawn = [
        60,0,0
    ];

    this.color = [
        1,1,1,1
    ];
}

Light.prototype.setSunsetLights = function (cameraMatrix,uniformName, coloruniformname) {
    this.setLights(cameraMatrix,uniformName,this.sunset,this.color);
};

Light.prototype.setDawn = function (cameraMatrix,uniformName, coloruniformname) {
    this.setLights(cameraMatrix,uniformName,this.dawn,coloruniformname);
};

Light.prototype.setHighNoon = function (cameraMatrix,uniformName, coloruniformname) {
    this.setLights(cameraMatrix,uniformName,this.highnoon,this.color, coloruniformname);
};

Light.prototype.setLights = function(cameraMatrix, uniformName, position, coloruniformname){
    var lightPositionEye = vec3.create();
    vec3.transformMat4( lightPositionEye , position , cameraMatrix);
    gl.uniform3fv( shaderProgram.uniformIDs[uniformName] , lightPositionEye ) ;
    //todo add buffer


    //var colorVector = vec4.create();
    //gl.uniform4f(shaderProgram.uniformIDs[coloruniformname], 0, 0, 1, 1);

}