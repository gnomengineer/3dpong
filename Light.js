function Light() {
    this.sunset = [
        2,2,0
    ];

    this.highnoon = [
        0,2,3
    ];

    this.dawn = [
        -2,-2,0
    ];

    this.dawnColor = [
        0.875,0.85,0.63
    ];

    this.noonColor = [
        1,1,1
    ]

    this.sunsetColor = [
        0.92,0.44,0.45
    ]

}

Light.prototype.setSunset = function (cameraMatrix,positionUniform, colorUniform) {
    this.setLights(cameraMatrix,positionUniform,this.sunset,this.sunsetColor, colorUniform);
};

Light.prototype.setDawn = function (cameraMatrix,positionUniform, colorUniform) {
    this.setLights(cameraMatrix,positionUniform,this.dawn,this.dawnColor, colorUniform);
};

Light.prototype.setHighNoon = function (cameraMatrix,positionUniform, colorUniform) {
    this.setLights(cameraMatrix,positionUniform,this.highnoon,this.noonColor, colorUniform);
};

Light.prototype.setLights = function(cameraMatrix, positionUniform, position, color, colorUniform){
    var lightPositionEye = vec3.create();
    vec3.transformMat4( lightPositionEye , position , cameraMatrix);
    gl.uniform3fv( shaderProgram.uniformIDs[positionUniform] , lightPositionEye ) ;
    //gl.uniform3fv( shaderProgram.uniformIDs[colorUniform], color);

    //var colorVector = vec4.create();
    //gl.uniform4f(shaderProgram.uniformIDs[coloruniformname], 0, 0, 1, 1);

};