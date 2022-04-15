const { FluentCanvas2D } = require('../../libs/wxmini-canvas.min.js');

Page({
    onReady () {
        FluentCanvas2D.select('#myCanvas1', (fcanvas) => {
            fcanvas
                .rect(10, 10, 100, 30)
                .setFillStyle('yellow')
                .fill()
                .beginPath()
                .rect(10, 40, 100, 30)
                .setFillStyle('blue')
                .fillRect(10, 70, 100, 30)
                .rect(10, 100, 100, 30)
                .setFillStyle('red')
                .fill()
                .closePath();
        });

        FluentCanvas2D.select('#myCanvas2', (fcanvas) => {
            fcanvas
                .setFillStyle('red')
                .fillRect(0, 0, 150, 200)
                .setFillStyle('blue')
                .fillRect(150, 0, 150, 200)
                .clearRect(10, 10, 150, 75);
        });

        FluentCanvas2D.select('#myCanvas3', (fcanvas) => {
            fcanvas
                .setFillStyle('red')
                .fillRect(10, 10, 150, 100)
                .setGlobalAlpha(0.2)
                .setFillStyle('blue')
                .fillRect(50, 50, 150, 100)
                .setFillStyle('yellow')
                .fillRect(100, 100, 150, 100);
        });
    }
});
