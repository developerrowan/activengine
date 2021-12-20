interface IEngineOptions {
    width: number;
    height: number;
    canvasId: string;
}
export declare class Engine {
    private width;
    private height;
    private canvas;
    private canvasId;
    private secondsPassed;
    private oldTimeStamp;
    private fps;
    private drawing;
    private drawHook;
    private updateHook;
    constructor(options: IEngineOptions);
    draw(): void;
    loop(timeStamp: number): void;
    findCanvas(canvasId: string): HTMLCanvasElement;
    setCanvas(canvasEl: string): void;
    setCanvasProperties(): void;
    getCanvas(): HTMLCanvasElement;
    getContext(): WebGLRenderingContext;
    private clearCanvas;
    resize(width: number, height: number): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
}
export {};
