const { FluentCanvas2D } = require('../../libs/wxmini-canvas.min.js');

Page({
    onReady () {
        FluentCanvas2D.select('#myCanvas1', (fcanvas) => {
            fcanvas
                .strokeRect(10, 10, 25, 15)
                .scale(2, 2)
                .strokeRect(10, 10, 25, 15)
                .scale(2, 2)
                .strokeRect(10, 10, 25, 15);
        });

        FluentCanvas2D.select('#myCanvas2', (fcanvas) => {
            fcanvas
                .strokeRect(100, 10, 150, 100)
                .rotate((20 * Math.PI) / 180)
                .strokeRect(100, 10, 150, 100)
                .rotate((20 * Math.PI) / 180)
                .strokeRect(100, 10, 150, 100);
        });
    }
});
