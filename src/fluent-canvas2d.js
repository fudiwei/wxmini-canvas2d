class FluentCanvas2D {
    constructor(canvas, { offscreen, selector, env, component }) {
        if (new.target !== FluentCanvas2D)
            throw "Class constructor 'FluentCanvas2D' cannot be invoked without 'new'.";
        if (typeof canvas?.getContext !== 'function') throw 'The first argument must be a Canvas object.';

        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this._options = { offscreen, selector, env, component };

        ['_canvas', '_context', '_options'].forEach((k) =>
            Object.defineProperty(this, k, { enumerable: false, configurable: false, writable: false })
        );
    }

    // #region 静态方法
    static select (options = {}, callback) {
        options = 'string' === typeof options ? { selector: options } : options;
        options.env = options.env ?? wx;

        return new Promise((resolve, reject) => {
            if (options.offscreen) {
                const canvas = options.env.createOffscreenCanvas({
                    type: '2d',
                    width: options.width,
                    height: options.height,
                    compInst: options.component
                });
                return resolve({ node: canvas });
            }

            (options.component ?? options.env)
                .createSelectorQuery()
                .select(options.selector)
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    if (!res || !res[0]) {
                        return reject({
                            errMsg: `Could not find any Canvas node selected by '${options.selector}'.`
                        });
                    }

                    resolve(res[0]);
                });
        }).then((res) => {
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
    getCanvas () {
        return this._canvas;
    }

    getContext () {
        return this._context;
    }

    getWidth () {
        return this._canvas.width;
    }

    getHeight () {
        return this._canvas.height;
    }

    setWidth (width) {
        this._canvas.width = width;
        return this;
    }

    setHeight (height) {
        this._canvas.height = height;
        return this;
    }

    setSize ({ width, height }) {
        return this.setWidth(width).setHeight(height);
    }

    tap (callback) {
        callback && callback(this);
        return this;
    }
    // #endregion

    // #region Canvas API
    createPath2D () {
        return this._canvas.createPath2D();
    }

    createImage () {
        return this._canvas.createImage();
    }

    createImageData (...args) {
        if (args.length === 0) {
            return this._canvas.createImageData();
        }

        return this._context.createImageData(...args);
    }

    requestAnimationFrame (callback) {
        return this._canvas.requestAnimationFrame(callback);
    }

    cancelAnimationFrame (requestId) {
        this._canvas.cancelAnimationFrame(requestId);
        return this;
    }

    toDataURL (type, encoderOptions) {
        return this._canvas.toDataURL(type, encoderOptions);
    }
    // #endregion

    // #region Canvas Context 2D API 扩展
    rectWithRadius (x, y, w, h, r) {
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

    fillRectWithRadius (x, y, w, h, r) {
        return this.rectWithRadius(x, y, w, h, r).fill();
    }

    strokeRectWithRadius (x, y, w, h, r) {
        return this.rectWithRadius(x, y, w, h, r).stroke();
    }

    drawImageWithRadius (...args) {
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

    fillTextWithWrap (text, x, y, maxWidth, ...args) {
        _calcTextWithWrapPositions(this, text, x, y, maxWidth, ...args).forEach((p) => {
            this.fillText(p.text, p.x, p.y);
        });

        return this;
    }

    strokeTextWithWrap (text, x, y, maxWidth, ...args) {
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

function _calcTextWithWrapPositions (fcanvas, text, xPos, yPos, maxWidth, ...args) {
    let maxHeight, fontSize, textAlign, textBaseline, lineHeight;
    xPos = +xPos;
    yPos = +yPos;
    fontSize = +fcanvas.getFont().match(/\d+px/g)[0].match(/\d+/g)[0];
    textAlign = fcanvas.getTextAlign();
    textBaseline = fcanvas.getTextBaseline();
    maxWidth = +(maxWidth ?? (fcanvas.getWidth() - xPos));
    maxHeight = +((args.length >= 2 ? args[0] : undefined) ?? (fcanvas.getHeight() - yPos));
    lineHeight = args.length >= 2 ? args[1] : args[0];

    if (isNaN(xPos)) throw 'The value of \'x\' must be a Number.';
    if (isNaN(yPos)) throw 'The value of \'x\' must be a Number.';

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
    let paragraphs = [], pTotalLines = 0;
    paragraphs = text.split('\n').map((t) => {
        const lines = [];
        const tryAddIntoLines = (line) => {
            if (pTotalLines * lineHeight > maxHeight) {
                return false;
            }

            lines.push(line);
            pTotalLines++;
            return true;
        };

        if (context.measureText(t).width <= maxWidth) {
            if (!tryAddIntoLines(t))
                return lines;
        } else {
            const words = Array.from(t), total = words.length;

            for (let i = 0, line = ''; i < total; i++) {
                const str = line + words[i];
                if (context.measureText(str).width > maxWidth) {
                    if (!tryAddIntoLines(line))
                        return lines;
                    line = words[i];
                } else {
                    line = str;
                    if (i === total - 1) {
                        if (!tryAddIntoLines(line))
                            return lines;
                    }
                }
            }
        }

        return lines;
    });

    // 计算定位
    let positions = [];
    for (let i = 0, num = 0; i < paragraphs.length; i++) {
        for (let j = 0; j < paragraphs[i].length; j++) {
            let text = paragraphs[i][j], x = xPos, y = yPos;

            switch (textBaseline) {
                case 'top':
                case 'hanging':
                    {
                        y = y + (num * lineHeight);
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
