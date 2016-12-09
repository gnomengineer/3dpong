precision mediump float;
varying vec4 vColor;

varying vec3 vNormal;
varying vec3 vVertexPosition;

//lights
uniform vec3 uLightPosition;
uniform vec3 uLightColor;


void main() {

    vec3 ambientLight = vec3(0.2 , 0.2 , 0.2);

    vec3 L = normalize(uLightPosition - vVertexPosition);
    vec3 eye = normalize(vVertexPosition);
    vec3 reflection = normalize(reflect(L, vNormal));

    vec3 diffuseWeight = uLightColor * max ( dot ( normalize(vNormal) , L ) , 0.2);
    vec3 diffuse = clamp(diffuseWeight, 0.0,1.0);
    //vec3 lightning = ambientLight + (directionalLightColor * directional);

    vec3 spec = vec3(0.4,0.4,0.4) *  pow(max(dot(reflection, eye), 0.0), 1.4);
   spec = clamp(spec, 0.0, 1.0);

    gl_FragColor = vec4 (vColor.rgb * (ambientLight + diffuse) + spec, vColor.a);
//    gl_FragColor = vec4 (vColor.rgb , vColor.a);

}