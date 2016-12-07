attribute vec3 aVertexPosition;
attribute vec4 aVertexColor ;
attribute vec3 aVertexNormal;

//object
uniform mat3 uNormalMatrix;
uniform mat4 uModelMatrix;
//perspective
uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;
//lights
uniform vec3 uLightPosition;
uniform vec3 uLightColor;

varying vec4 vColor ;
varying vec3 vLight;

void main () {
    vColor = aVertexColor ;
    vec4 position = vec4 (aVertexPosition, 1.0) ;

    vec3 ambientLight = vec3 (1 , 1 , 1) ;
    vec3 directionalLightColor = vec3 (1 ,1, 0) ;

    vec3 normal = normalize(uNormalMatrix * aVertexNormal);
    float directional = max ( dot ( normal , uLightPosition ) , 0.0);
    vLight = ambientLight + (directionalLightColor * directional);
    gl_Position = uProjectionMatrix * uCameraMatrix * uModelMatrix * position ;
}