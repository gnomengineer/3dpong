precision mediump float;
varying vec4 vColor;
varying vec3 vLight;

void main() {
    gl_FragColor = vec4 (vColor.rgb * vLight , vColor.a);
}