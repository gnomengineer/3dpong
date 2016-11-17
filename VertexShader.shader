attribute vec3 aVertexPosition;
attribute vec4 aVertexColor ;

uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;
uniform mat4 uModelViewMatrix;

varying vec4 vColor ;

void main () {
    vColor = aVertexColor ;
    vec4 position = vec4 (aVertexPosition, 1.0) ;

    gl_Position = uProjectionMatrix * uCameraMatrix * uModelViewMatrix * position ;
}