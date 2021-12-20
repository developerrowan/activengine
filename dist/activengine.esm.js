class Drawing {
    constructor(engine) {
        this.engine = engine;
        this.gl = engine.getContext();
    }
    setBackgroundColor(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    setBackgroundColorHex(hex, alpha) {
        if (hex.length <= 0) {
            throw new Error("Unspecified hex value in methos setBackgroundColorHex.");
        }
        const rgb = this.hexToRGB(hex);
        if (!rgb) {
            throw new Error("Error while converting hex to rgb - possible malformed or nonexistent hex value.");
        }
        this.setBackgroundColor(rgb[0], rgb[1], rgb[2], alpha);
    }
    hexToRGB(hex) {
        var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }
    initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        // Create the shader program
        const shaderProgram = gl.createProgram();
        if (!shaderProgram || !vertexShader || !fragmentShader) {
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
    loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        if (!shader) {
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

class Engine {
    constructor(options) {
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.fps = 0;
        this.drawHook = null;
        this.updateHook = null;
        if (options.width <= 0 || options.height <= 0) {
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
    draw() {
        if (this.drawHook) {
            this.drawHook();
        }
    }
    loop(timeStamp) {
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
        this.fps = Math.round(1 / this.secondsPassed);
        this.draw();
        window.requestAnimationFrame(this.loop.bind(this));
    }
    findCanvas(canvasId) {
        if (canvasId === null || canvasId.length <= 0) {
            throw new Error("Canvas ID cannot be null or empty.");
        }
        const c = document.getElementById(canvasId);
        if (!c) {
            throw new Error(`Canvas of specified ID ${canvasId} does not exist within the DOM.`);
        }
        return c;
    }
    setCanvas(canvasEl) {
        this.canvas = this.findCanvas(canvasEl);
        this.setCanvasProperties();
    }
    setCanvasProperties() {
        this.getCanvas().width = this.width;
        this.getCanvas().height = this.height;
    }
    getCanvas() {
        if (!this.canvas) {
            throw new Error("Illegal attempt to access canvas element that has not been initialized.");
        }
        return this.canvas;
    }
    getContext() {
        const glContext = this.getCanvas().getContext("webgl");
        if (!glContext) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            throw new Error("Unable to initialize WebGL. It most likely is not supported by the browser attempting to use it.");
        }
        return glContext;
    }
    clearCanvas() {
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.getCanvas().width = width;
        this.getCanvas().height = height;
    }
    setWidth(width) {
        this.resize(width, this.height);
    }
    setHeight(height) {
        this.resize(this.width, height);
    }
}

export { Engine };
