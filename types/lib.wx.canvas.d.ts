declare namespace WechatMiniprogram {
    namespace Wx {
        type WxRenderingContextDifferentWithDOMKeys = "canvas" | "getContextAttributes" | "createPattern" | "createImageData" | "getImageData" | "putImageData" | "drawImage" | "drawFocusIfNeeded" | "measureText";

        type WxNode = WechatMiniprogram.NodeCallbackResult["node"];
    }

    interface Node extends Wx.WxNode {}

    interface Path2D extends globalThis.Path2D {}

    interface CanvasImageSource extends WechatMiniprogram.ImageData, WechatMiniprogram.Image {}

    interface RenderingContext extends Omit<globalThis.CanvasRenderingContext2D, Wx.WxRenderingContextDifferentWithDOMKeys> {
        readonly canvas: Canvas;

        createPattern(image: WechatMiniprogram.CanvasImageSource, repetition: string | null): CanvasPattern | null;

        createImageData(sw: number, sh: number, settings?: ImageDataSettings): WechatMiniprogram.ImageData;
        createImageData(imagedata: WechatMiniprogram.ImageData): WechatMiniprogram.ImageData;
        getImageData(sx: number, sy: number, sw: number, sh: number, settings?: ImageDataSettings): WechatMiniprogram.ImageData;
        putImageData(imagedata: WechatMiniprogram.ImageData, dx: number, dy: number): void;
        putImageData(imagedata: WechatMiniprogram.ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void;

        drawImage(image: WechatMiniprogram.CanvasImageSource, dx: number, dy: number): void;
        drawImage(video: WechatMiniprogram.VideoContext, dx: number, dy: number): void;
        drawImage(image: WechatMiniprogram.CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
        drawImage(video: WechatMiniprogram.VideoContext, dx: number, dy: number, dw: number, dh: number): void;
        drawImage(image: WechatMiniprogram.CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
        drawImage(video: WechatMiniprogram.VideoContext, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;

        drawFocusIfNeeded(element: WechatMiniprogram.Node): void;
        drawFocusIfNeeded(path: WechatMiniprogram.Path2D, element: WechatMiniprogram.Node): void;

        measureText(text: string): WechatMiniprogram.TextMetrics;
    }
}
