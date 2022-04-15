// @ts-nocheck
import { selectCanvasNodeAsync } from '../../utils/selector';

declare type ThisConstructorParameter1 = WechatMiniprogram.Canvas | WechatMiniprogram.OffscreenCanvas;
declare type ThisConstructorParameter2 = { offscreen?: boolean; selector?: string; env?: any; component?: any };

class FluentCanvas2D {
    private _canvas!: WechatMiniprogram.Canvas | WechatMiniprogram.OffscreenCanvas;
    private _context!: WechatMiniprogram.RenderingContext;

    private constructor(
        canvas: ThisConstructorParameter1,
        { offscreen, selector, env, component }: ThisConstructorParameter2
    ) {
        if (new.target !== FluentCanvas2D) throw "Class constructor 'FluentCanvas2D' cannot be invoked without 'new'.";
        if (typeof canvas?.getContext !== 'function') throw 'The first argument must be a Canvas object.';

        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this._options = { offscreen, selector, env, component };

        ['_canvas', '_context', '_options'].forEach((k) =>
            Object.defineProperty(this, k, { enumerable: false, configurable: false, writable: false })
        );
    }

    // #region 静态方法
    public static select(options = {}, callback): FluentCanvas2D {
        return selectCanvasNodeAsync(options).then((res) => {
            const canvas = res.node;

            let fcanvas = canvas._fcanvasRef;
            if (!(fcanvas instanceof FluentCanvas2D)) {
                fcanvas = new FluentCanvas2D(canvas, options);
                canvas.width = options.width ?? res.width;
                canvas.height = options.height ?? res.height;
                canvas._fcanvasRef = fcanvas;

                if (options.autoScaleWithDPR) {
                    const dpr = options.env.getSystemInfoSync().pixelRatio;
                    canvas.width = canvas.width * dpr;
                    canvas.height = canvas.height * dpr;
                    fcanvas.resetTransform().scale(dpr, dpr);
                }
            }

            typeof callback === 'function' && callback(fcanvas);
            return Promise.resolve(fcanvas);
        });
    }
    // #endregion

    // #region 基础方法
    public getCanvas(): typeof this['_canvas'] {
        return this._canvas;
    }

    public getContext(): typeof this['_context'] {
        return this._context;
    }

    public getWidth(): number {
        return this._canvas.width;
    }

    public getHeight(): number {
        return this._canvas.height;
    }

    public setWidth(width: number): this {
        this._canvas.width = width;
        return this;
    }

    public setHeight(height: number): this {
        this._canvas.height = height;
        return this;
    }

    public setSize({ width, height }: { width: number; height: number }): this {
        return this.setWidth(width).setHeight(height);
    }

    public tap(callback: (fcanvas?: FluentCanvas2D) => void): this {
        callback && callback(this);
        return this;
    }
    // #endregion

    // #region Canvas API
    public createPath2D(): WechatMiniprogram.Path2D {
        return (<WechatMiniprogram.Canvas>this._canvas).createPath2D();
    }

    public createImage(): WechatMiniprogram.Image {
        return this._canvas.createImage();
    }

    public createImageData(...args: any[]): WechatMiniprogram.ImageData {
        if (args.length === 0) {
            return (<WechatMiniprogram.Canvas>this._canvas).createImageData();
        }

        return this._context.createImageData(...args);
    }

    public requestAnimationFrame(callback?: () => void): number {
        return (<WechatMiniprogram.Canvas>this._canvas).requestAnimationFrame(callback);
    }

    public cancelAnimationFrame(requestId: number): this {
        (<WechatMiniprogram.Canvas>this._canvas).cancelAnimationFrame(requestId);
        return this;
    }

    public toDataURL(type?: string, encoderOptions?: any) {
        return (<WechatMiniprogram.Canvas>this._canvas).toDataURL(type, encoderOptions);
    }
    // #endregion

    // #region Canvas Context 2D API 扩展
    public rectWithRadius(x: number, y: number, w: number, h: number, r: number): this {
        (x = +x), (y = +y), (w = +w), (h = +h), (r = +r);
        return this.beginPath()
            .moveTo(x + r, y)
            .lineTo(x + w - r, y)
            .arcTo(x + w, y, x + w, y + r, r)
            .lineTo(x + w, y + h - r)
            .arcTo(x + w, y + h, x + w - r, y + h, r)
            .lineTo(x + r, y + h)
            .arcTo(x, y + h, x, y + h - r, r)
            .lineTo(x, y + r)
            .arcTo(x, y, x + r, y, r);
    }

    public fillRectWithRadius(x: number, y: number, w: number, h: number, r: number): this {
        return this.rectWithRadius(x, y, w, h, r).fill();
    }

    public strokeRectWithRadius(x: number, y: number, w: number, h: number, r: number): this {
        return this.rectWithRadius(x, y, w, h, r).stroke();
    }

    public drawImageWithRadius(...args: any[]): this {
        if (args.length !== 4 && args.length !== 6 && args.length !== 10)
            throw `Failed to execute \'drawImageWithRadius\' on \'FluentCanvas2D\': 10 arguments required, but only ${args.length} present.`;

        const image = args.shift(),
            radius = args.pop();
        return this.save()
            .closePath()
            .rectWithRadius(...args, radius)
            .clip()
            .drawImage(image, ...args)
            .restore();
    }

    public fillTextWithWrap(text: string, x: number, y: number, maxWidth?: number, ...args: any[]): this {
        _calcTextWithWrapPositions(this, text, x, y, maxWidth, ...args).forEach((p) => {
            this.fillText(p.text, p.x, p.y);
        });

        return this;
    }

    public strokeTextWithWrap(text: string, x: number, y: number, maxWidth?: number, ...args: any[]): this {
        _calcTextWithWrapPositions(this, text, x, y, maxWidth, ...args).forEach((p) => {
            this.strokeText(p.text, p.x, p.y);
        });

        return this;
    }
    // #endregion
}

'direction|fillStyle|font|globalAlpha|globalCompositeOperation|lineCap|lineDashOffset|lineJoin|lineWidth|miterLimit|shadowBlur|shadowColor|shadowOffsetX|shadowOffsetY|strokeStyle|textAlign|textBaseline'
    .split('|')
    .forEach((prop) => {
        const key = prop.replace(prop.charAt(0), prop.charAt(0).toUpperCase());
        FluentCanvas2D.prototype['get' + key] = function () {
            return this._context[prop];
        };
        FluentCanvas2D.prototype['set' + key] = function (value) {
            this._context[prop] = value;
            return this;
        };
    });

'arc|arcTo|beginPath|bezierCurveTo|clearRect|clip|closePath|drawImage|fill|fillRect|fillText|lineTo|moveTo|putImageData|quadraticCurveTo|rect|resetTransform|restore|rotate|save|scale|setLineDash|setTransform|stroke|strokeRect|strokeText|transform|translate'
    .split('|')
    .forEach((method) => {
        FluentCanvas2D.prototype[method] = function () {
            this._context[method].apply(this._context, arguments);
            return this;
        };
    });

'createLinearGradient|createPattern|createRadialGradient|getImageData|getLineDash|isPointInPath|isPointInStroke|measureText'
    .split('|')
    .forEach((method) => {
        /* NOTICE: `createImage` 需特殊处理 */
        FluentCanvas2D.prototype[method] = function () {
            return this._context[method].apply(this._context, arguments);
        };
    });

function _calcTextWithWrapPositions(
    fcanvas: FluentCanvas2D,
    text: string,
    xPos: number,
    yPos: number,
    maxWidth?: number,
    ...args: any[]
): Array<{ text: string; x: number; y: number }> {
    let maxHeight, fontSize, textAlign, textBaseline, lineHeight;
    xPos = +xPos;
    yPos = +yPos;
    fontSize = +fcanvas.getFont().match(/\d+px/g)[0].match(/\d+/g)[0];
    textAlign = fcanvas.getTextAlign();
    textBaseline = fcanvas.getTextBaseline();
    maxWidth = +(maxWidth ?? fcanvas.getWidth() - xPos);
    maxHeight = +((args.length >= 2 ? args[0] : undefined) ?? fcanvas.getHeight() - yPos);
    lineHeight = args.length >= 2 ? args[1] : args[0];

    if (isNaN(xPos)) throw "The value of 'x' must be a Number.";
    if (isNaN(yPos)) throw "The value of 'y' must be a Number.";

    const context = fcanvas.getContext();
    const MULTI_NEWLINE_DELIMITER = '\u200b';

    // 格式化文本
    text = String(text ?? '').replace(/\r/g, '');
    while (text.indexOf('\n\n') > -1) {
        text = text.replace(/\n\n/g, '\n' + MULTI_NEWLINE_DELIMITER + '\n');
    }

    // 格式化行高
    if (!isNaN(lineHeight)) {
        lineHeight = fontSize * lineHeight;
    } else if (/^(([1-9]\d*\.?\d*)|(0\.\d*[1-9]))px$/.test(lineHeight)) {
        lineHeight = parseFloat(lineHeight);
    } else if (/^(([1-9]\d*\.?\d*)|(0\.\d*[1-9]))em$/.test(lineHeight)) {
        lineHeight = fontSize * parseFloat(lineHeight);
    } else if (/^(([1-9]\d*\.?\d*)|(0\.\d*[1-9]))%$/.test(lineHeight)) {
        lineHeight = (fontSize * parseFloat(lineHeight)) / 100;
    } else {
        lineHeight = fontSize;
    }

    // 分词分段
    let paragraphs: Array<string[]> = [],
        pTotalLines: number = 0;
    paragraphs = text.split('\n').map((t) => {
        const lines: typeof paragraphs[number] = [];
        const tryAddIntoLines = (line: string) => {
            if (pTotalLines * lineHeight > maxHeight) {
                return false;
            }

            lines.push(line);
            pTotalLines++;
            return true;
        };

        if (context.measureText(t).width <= maxWidth) {
            if (!tryAddIntoLines(t)) return lines;
        } else {
            const words = Array.from(t),
                total = words.length;

            for (let i = 0, line = ''; i < total; i++) {
                const str = line + words[i];
                if (context.measureText(str).width > maxWidth) {
                    if (!tryAddIntoLines(line)) return lines;
                    line = words[i];
                } else {
                    line = str;
                    if (i === total - 1) {
                        if (!tryAddIntoLines(line)) return lines;
                    }
                }
            }
        }

        return lines;
    });

    // 计算定位
    let positions: Array<{ text: string; x: number; y: number }> = [];
    for (let i = 0, num = 0; i < paragraphs.length; i++) {
        for (let j = 0; j < paragraphs[i].length; j++) {
            let text = paragraphs[i][j],
                x = xPos,
                y = yPos;

            switch (textBaseline) {
                case 'top':
                case 'hanging':
                    {
                        y = y + num * lineHeight;
                    }
                    break;

                case 'middle':
                    {
                        y = y - (parseInt(pTotalLines / 2) - num) * lineHeight;
                    }
                    break;

                case 'alphabetic':
                case 'ideographic':
                case 'bottom':
                default:
                    {
                        y = y - (pTotalLines - num - 1) * lineHeight;
                    }
                    break;
            }

            positions.push({ text, x, y });
            num++;
        }
    }

    return positions;
}

export default FluentCanvas2D;
