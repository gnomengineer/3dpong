attribute vec3 aVertexPosition;
attribute vec4 aVertexColor ;
attribute vec3 aVertexNormal;
attribute vec3 lightColor;

uniform mat3 uNormalMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;
uniform mat4 uModelMatrix;
uniform vec3 uLightPosition;

varying vec4 vColor ;
varying vec3 vVertexPosition;
varying vec3 vLight;

void main () {
    vColor = aVertexColor ;
    vec4 position = vec4 (aVertexPosition, 1.0) ;

    vec3 ambientLight = vec3 (0.5 , 0.5 , 0.5) ;
    vec3 directionalLightColor = vec3 (1 ,0, 1) ;

    vec3 normal = normalize(uNormalMatrix * aVertexNormal);
    float directional = max ( dot ( normal , uLightPosition ) , 0.2);
    vLight = ambientLight + (directionalLightColor * directional);
    gl_Position = uProjectionMatrix * uCameraMatrix * uModelMatrix * position ;
    //vVertexPosition = gl_Position;
}