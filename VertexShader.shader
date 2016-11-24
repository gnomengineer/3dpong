attribute vec3 aVertexPosition;
attribute vec4 aVertexColor ;
attribute vec3 aVertexNormal;

uniform mat3 uNormalMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;
uniform mat4 uModelMatrix;
uniform vec3 uLightPosition;

varying vec4 vColor ;
varying vec3 vNormal;
varying vec3 vVertexPosition;

void main () {
    vColor = aVertexColor ;
    vec4 position = vec4 (aVertexPosition, 1.0) ;

    vNormal = uNormalMatrix * normalize(aVertexNormal);
    gl_Position = uProjectionMatrix * uCameraMatrix * uModelMatrix * position ;
    //vVertexPosition = gl_Position;
}