const { FluentCanvas2D } = require('../../../libs/wxmini-canvas.min.js');

Component({
    methods: {
        draw (imgPath) {
            FluentCanvas2D.select({
                selector: '#myCanvas',
                width: 100,
                height: 100,
                component: this // 自定义组件内使用要指定 this
            }).then((fcanvas) => {
                const img = fcanvas.createImage();
                img.onload = () => {
                    fcanvas
                        .clearRect(0, 0, fcanvas.getWidth(), fcanvas.getHeight())
                        .drawImageWithRadius(img, 0, 0, 100, 100, 50);
                };
                img.src = imgPath;
            });
        },

        onLongPress () {
            wx.showActionSheet({
                itemList: ['保存'],
                success: (res) => {
                    if (res.tapIndex === 0) {
                        FluentCanvas2D.select({
                            selector: '#myCanvas',
                            component: this
                        }, (fcanvas) => {
                            wx.canvasToTempFilePath({
                                canvas: fcanvas.getCanvas(),
                                success: (res) => {
                                    wx.saveImageToPhotosAlbum({
                                        filePath: res.tempFilePath
                                    });
                                }
                            }, this);
                        });
                    }
                }
            });
        }
    }
});
