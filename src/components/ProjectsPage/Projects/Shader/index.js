export const vertex = `
    varying vec2 vUv;
    float PI = 3.141592653589793238;
    uniform vec2 uDelta;
    uniform float uAmplitude;

    void main() {
        vUv = uv;
        vec3 newPosition = position;

        newPosition.x += sin(uv.y * PI) * uDelta.x * 0.0005;
        newPosition.y += sin(uv.x * PI) * uDelta.y * 0.0005;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`
// creating the offset (uDelta), value between 0 and x (that can be whatever)
// this is the curvature effect based on PI number and sin() function
// we need to scale it based on the offset of the uv coordinates

export const fragment = `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uAlpha;
    void main() {
        vec3 texture = texture2D(uTexture, vUv).rgb;
        vec4 transparentColor = vec4(texture, 0.0);
        vec4 textureColor = vec4(texture, 1.0);
        gl_FragColor = mix(transparentColor, textureColor, uAlpha);
    }
`