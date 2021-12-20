import { Engine } from "./Engine";
export declare class Drawing {
    private engine;
    private gl;
    constructor(engine: Engine);
    setBackgroundColor(r: number, g: number, b: number, a: number): void;
    setBackgroundColorHex(hex: string, alpha: number): void;
    private hexToRGB;
    initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null;
    loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null;
}
