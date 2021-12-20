interface IEngineOptions {
    width: number,
    height: number,
    canvasId: string
};

import { Drawing } from './Drawing';

export class Engine {

    private width: number;
    private height: number;
    private canvas: HTMLCanvasElement;
    private canvasId: string;

    private secondsPassed: number = 0;
    private oldTimeStamp: number = 0;
    private fps: number = 0;

    private drawing: Drawing;

    private drawHook: Function | null = null;
    private updateHook: Function | null = null;


    constructor(options: IEngineOptions) {

        if(options.width <= 0 || options.height <= 0) {
            throw new Error("Engine width and / or height must be greater than zero.");
        }

        this.width = options.width;
        this.height = options.height;
        this.canvasId = options.canvasId;
        this.canvas = this.findCanvas(this.canvasId);

        this.setCanvasProperties();

        this.drawing = new Drawing(this);

        window.requestAnimationFrame(this.loop.bind(this));
    }

    public draw(): void {
        if(this.drawHook) {
            this.drawHook();
        }
    }

    public loop(timeStamp: number): void {
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        this.fps = Math.round(1 / this.secondsPassed);

        this.draw();

        window.requestAnimationFrame(this.loop.bind(this));
    }

    public findCanvas(canvasId: string): HTMLCanvasElement {
        if(canvasId === null || canvasId.length <= 0) {
            throw new Error("Canvas ID cannot be null or empty.");
        }

        const c = document.getElementById(canvasId);

        if(!c) {
            throw new Error(`Canvas of specified ID ${canvasId} does not exist within the DOM.`);
        }

        return <HTMLCanvasElement> c;
    }

    public setCanvas(canvasEl: string): void {
        this.canvas = this.findCanvas(canvasEl);

        this.setCanvasProperties();
    }

    public setCanvasProperties(): void {
        this.getCanvas().width = this.width;
        this.getCanvas().height = this.height;
    }

    public getCanvas(): HTMLCanvasElement {
        if(!this.canvas) {
            throw new Error("Illegal attempt to access canvas element that has not been initialized.");
        }

        return this.canvas;
    }

    public getContext(): WebGLRenderingContext {
        const glContext = <WebGLRenderingContext> this.getCanvas().getContext("webgl");

        if(!glContext) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            throw new Error("Unable to initialize WebGL. It most likely is not supported by the browser attempting to use it.");
        }

        return glContext;        
    }

    private clearCanvas(): void {

    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        
        this.getCanvas().width = width;
        this.getCanvas().height = height;
    }

    public setWidth(width: number): void {
        this.resize(width, this.height);
    }

    public setHeight(height: number): void {
        this.resize(this.width, height);
    }

}