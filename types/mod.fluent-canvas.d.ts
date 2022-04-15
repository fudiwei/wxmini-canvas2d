declare namespace SKIT.WxminiCanvas2D {
    namespace FluentCanvas2D {
        export interface SelectOptions {
            /**
             * 是否是离屏画布。
             */
            offscreen?: boolean;
            /**
             * 指定 Canvas 的 DOM 选择器。非离屏画布时必填。
             */
            selector?: string;
            /**
             * 指定初始化时的画布宽度。
             * @default 默认值为 null，将使用 DOM 宽度乘以 DPR。
             */
            width?: number;
            /**
             * 指定初始化时的画布高度。
             * @default 默认值为 null，将使用 DOM 高度乘以 DPR。
             */
            height?: number;
            /**
             * 指定初始化时是否根据 DPR 自动缩放。
             * @default 默认值为 false。
             */
            autoScaleWithDPR?: boolean;
            /**
             * 指定当前执行环境的根对象。默认环境为 wx，如在 uni-app、Taro 等跨端小程序框架、或其他平台的小程序时请自行替换为相应的值。
             * @default 默认值为 `wx`。
             */
            env?: unknown;
            /**
             * 指定当前 `this`。如果在小程序自定义组件中运行请指定为组件实例对象。
             * @default 默认值为 null。
             */
            component?: WechatMiniprogram.Component.TrivialInstance | WechatMiniprogram.Page.TrivialInstance;
        }
    }

    export class FluentCanvas2D {
        private constructor();

        static select(options: FluentCanvas2D.SelectOptions | string, callback?: (fcanvas: FluentCanvas2D) => void): Promise<FluentCanvas2D>;

        getCanvas(): WechatMiniprogram.Canvas | WechatMiniprogram.OffscreenCanvas;
        getContext(): WechatMiniprogram.RenderingContext;
        getWidth(): number | undefined;
        getHeight(): number | undefined;
        setWidth(width: number): this;
        setHeight(height: number): this;
        setSize(width: number, height: number): this;
        tap(callback: (fcanvas?: this) => void): this;

        getGlobalAlpha(): number;
        setGlobalAlpha(globalAlpha: number): this;
        getGlobalCompositeOperation(): CompositeOperation;
        setGlobalCompositeOperation(globalCompositeOperation: CompositeOperation): this;
        getFillStyle(): string | CanvasGradient | CanvasPattern;
        setFillStyle(fillStyle: string | CanvasGradient | CanvasPattern): this;
        getStrokeStyle(): string | CanvasGradient | CanvasPattern;
        setStrokeStyle(strokeStyle: string | CanvasGradient | CanvasPattern): this;
        getFilter(): string;
        setFilter(filter: string): this;
        getImageSmoothingEnabled(): boolean;
        setImageSmoothingEnabled(imageSmoothingEnabled: boolean): this;
        getImageSmoothingQuality(): ImageSmoothingQuality;
        setImageSmoothingQuality(imageSmoothingQuality: ImageSmoothingQuality): this;
        getLineCap(): CanvasLineCap;
        setLineCap(lineCap: CanvasLineCap): this;
        getLineDash(): number[];
        setLineDash(segments: number[]): this;
        getLineDashOffset(): number;
        setLineDashOffset(lineDashOffset: number): this;
        getLineJoin(): CanvasLineJoin;
        setLineJoin(lineJoin: CanvasLineJoin): this;
        getLineWidth(): number;
        setLineWidth(lineWidth: number): this;
        getMiterLimit(): number;
        setMiterLimit(miterLimit: number): this;
        getShadowBlur(): number;
        setShadowBlur(shadowBlur: number): this;
        getShadowColor(): string;
        setShadowColor(shadowColor: string): this;
        getShadowOffsetX(): number;
        setShadowOffsetX(shadowOffsetX: number): this;
        getShadowOffsetY(): number;
        setShadowOffsetY(shadowOffsetY: number): this;
        getDirection(): CanvasDirection;
        setDirection(direction: CanvasDirection): this;
        getFont(): string;
        setFont(font: string): this;
        getTextAlign(): CanvasTextAlign;
        setTextAlign(textAlign: CanvasTextAlign): this;
        getTextBaseline(): CanvasTextBaseline;
        setTextBaseline(textBaseline: CanvasTextBaseline): this;

        isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
        isPointInPath(path: WechatMiniprogram.Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
        isPointInStroke(x: number, y: number): boolean;
        isPointInStroke(path: WechatMiniprogram.Path2D, x: number, y: number): boolean;

        createPattern(image: WechatMiniprogram.CanvasImageSource, repetition: string | null): CanvasPattern | null;

        createConicGradient(startAngle: number, x: number, y: number): CanvasGradient;
        createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
        createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;

        createPath2D(): WechatMiniprogram.Path2D;

        createImage(): WechatMiniprogram.Image;
        createImageData(): WechatMiniprogram.ImageData;
        createImageData(sw: number, sh: number, settings?: ImageDataSettings): WechatMiniprogram.ImageData;
        createImageData(imagedata: WechatMiniprogram.ImageData): WechatMiniprogram.ImageData;
        getImageData(sx: number, sy: number, sw: number, sh: number, settings?: ImageDataSettings): WechatMiniprogram.ImageData;
        putImageData(imagedata: WechatMiniprogram.ImageData, dx: number, dy: number): this;
        putImageData(imagedata: WechatMiniprogram.ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): this;

        clip(fillRule?: CanvasFillRule): this;
        clip(path: WechatMiniprogram.Path2D, fillRule?: CanvasFillRule): this;
        fill(fillRule?: CanvasFillRule): this;
        fill(path: WechatMiniprogram.Path2D, fillRule?: CanvasFillRule): this;
        stroke(): this;
        stroke(path: WechatMiniprogram.Path2D): this;

        beginPath(): this;
        closePath(): this;
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): this;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this;
        ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): this;
        lineTo(x: number, y: number): this;
        moveTo(x: number, y: number): this;
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this;
        rect(x: number, y: number, w: number, h: number): this;
        rectWithRadius(x: number, y: number, w: number, h: number, r: number): this;

        fillRect(x: number, y: number, w: number, h: number): this;
        fillRectWithRadius(x: number, y: number, w: number, h: number, r: number): this;
        strokeRect(x: number, y: number, w: number, h: number): this;
        strokeRectWithRadius(x: number, y: number, w: number, h: number, r: number): this;
        clearRect(x: number, y: number, w: number, h: number): this;

        drawImage(image: WechatMiniprogram.CanvasImageSource, dx: number, dy: number): this;
        drawImage(video: WechatMiniprogram.VideoContext, dx: number, dy: number): void;
        drawImage(image: WechatMiniprogram.CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
        drawImage(video: WechatMiniprogram.VideoContext, dx: number, dy: number, dw: number, dh: number): this;
        drawImage(image: WechatMiniprogram.CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): this;
        drawImage(video: WechatMiniprogram.VideoContext, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): this;
        drawImageWithRadius(image: WechatMiniprogram.CanvasImageSource, dx: number, dy: number, r: number): this;
        drawImageWithRadius(image: WechatMiniprogram.CanvasImageSource, dx: number, dy: number, dw: number, dh: number, r: number): void;
        drawImageWithRadius(image: WechatMiniprogram.CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number, r: number): this;

        drawFocusIfNeeded(element: WechatMiniprogram.Node): this;
        drawFocusIfNeeded(path: WechatMiniprogram.Path2D, element: WechatMiniprogram.Node): this;

        measureText(text: string): WechatMiniprogram.TextMetrics;
        fillText(text: string, x: number, y: number, maxWidth?: number): this;
        strokeText(text: string, x: number, y: number, maxWidth?: number): this;
        fillTextWithWrap(text: string, x: number, y: number, maxWidth?: number, lineHeight?: number | string): this;
        fillTextWithWrap(text: string, x: number, y: number, maxWidth?: number, maxHeight?: number, lineHeight?: number | string): this;
        strokeTextWithWrap(text: string, x: number, y: number, maxWidth?: number, maxHeight?: number, lineHeight?: number | string | globalThis.ANGLE_instanced_arrays): this;
        strokeTextWithWrap(text: string, x: number, y: number, maxWidth?: number, lineHeight?: number | string): this;

        rotate(angle: number): this;
        scale(x: number, y: number): this;
        transform(a: number, b: number, c: number, d: number, e: number, f: number): this;
        translate(x: number, y: number): this;
        setTransform(a: number, b: number, c: number, d: number, e: number, f: number): this;
        setTransform(transform?: DOMMatrix2DInit): this;
        resetTransform(): this;

        reset(): this;
        restore(): this;
        save(): this;

        requestAnimationFrame(callback: () => void): number;
        cancelAnimationFrame(requestId: number): this;

        toDataURL(type?: string, encoderOptions?: number): string;
    }
}
