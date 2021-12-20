import { Engine } from "./Engine";

export class Drawing {

    private engine: Engine;
    private gl: WebGLRenderingContext;

    constructor(engine: Engine) {
        this.engine = engine;
        this.gl = engine.getContext();
    }

    public setBackgroundColor(r: number, g: number, b: number, a: number): void {
        this.gl.clearColor(r,g,b,a);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public setBackgroundColorHex(hex: string, alpha: number): void {
        if(hex.length <= 0) {
            throw new Error("Unspecified hex value in methos setBackgroundColorHex.");
        }

        const rgb = this.hexToRGB(hex);

        if(!rgb) {
            throw new Error("Error while converting hex to rgb - possible malformed or nonexistent hex value.");
        }

        this.setBackgroundColor(rgb[0],rgb[1],rgb[2],alpha);
    }

    private hexToRGB(hex: string): number[] {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

            return [r,g,b];
    }

    public initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
      
        // Create the shader program
      
        const shaderProgram = gl.createProgram();

        if(!shaderProgram || !vertexShader || !fragmentShader) {
            return null;
        }

        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
      
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
          return null;
        }
      
        return shaderProgram;
      }

    public loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
        const shader = gl.createShader(type);

        if(!shader) {
            return null;
        }
      
        // Send the source to the shader object
      
        gl.shaderSource(shader, source);
      
        // Compile the shader program
      
        gl.compileShader(shader);
      
        // See if it compiled successfully
      
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
      
        return shader;
      }
    
    
}