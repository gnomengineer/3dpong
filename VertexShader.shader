attribute vec3 aVertexPosition;
attribute vec4 aVertexColor ;
attribute vec3 aVertexNormal;

//object
uniform mat3 uNormalMatrix;
uniform mat4 uModelMatrix;
//perspective
uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;


varying vec4 vColor ;
varying vec3 vNormal;
varying vec3 vVertexPosition;

void main () {
    vColor = aVertexColor ;

    vec4 position = vec4 (aVertexPosition, 1.0) ;
    vVertexPosition = vec3(uCameraMatrix*uModelMatrix * position);
    vNormal = normalize(uNormalMatrix * aVertexNormal);

    gl_Position = uProjectionMatrix * uCameraMatrix * uModelMatrix * position ;
}