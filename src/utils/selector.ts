declare type ThisParamenterType = {
    offscreen?: boolean;
    selector?: string;
    width?: number;
    height?: number;
    env?: any;
    component?: any;
};

declare type ThisReturnType = WechatMiniprogram.NodeCallbackResult;

export const selectCanvasNodeAsync = (options: ThisParamenterType = {}): Promise<ThisReturnType> => {
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

        let selectorQuery = options.env.createSelectorQuery();
        if (!!options.component) {
            selectorQuery = selectorQuery.in(options.component);
        }

        selectorQuery
            .select(options.selector)
            .fields({
                node: true,
                size: true
            })
            .exec((res: ThisReturnType[]) => {
                if (!res || !res[0]) {
                    return reject({
                        errMsg: `Could not find any Canvas node selected by '${options.selector}'.`
                    });
                }

                resolve(res[0]);
            });
    });
};
