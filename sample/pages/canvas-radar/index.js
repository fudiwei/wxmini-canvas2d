const { FluentCanvas2D } = require('../../libs/wxmini-canvas.min.js');

Page({
    onReady () {
        FluentCanvas2D.select('#myCanvas1').then((fcanvas) => {
            fcanvas
                .arc(100, 75, 50, 0, 2 * Math.PI)
                .setFillStyle('#EEEEEE')
                .fill()
                .beginPath()
                .moveTo(40, 75)
                .lineTo(160, 75)
                .moveTo(100, 15)
                .lineTo(100, 135)
                .setStrokeStyle('#AAAAAA')
                .stroke()
                .closePath()
                .setFont('12px')
                .setFillStyle('black')
                .fillText('0', 165, 78)
                .fillText('0.5*PI', 83, 145)
                .fillText('1*PI', 15, 78)
                .fillText('1.5*PI', 83, 10)
                .beginPath()
                .arc(100, 75, 2, 0, 2 * Math.PI)
                .setFillStyle('lightgreen')
                .fill()
                .closePath()
                .beginPath()
                .arc(100, 25, 2, 0, 2 * Math.PI)
                .setFillStyle('blue')
                .fill()
                .closePath()
                .beginPath()
                .arc(150, 75, 2, 0, 2 * Math.PI)
                .setFillStyle('red')
                .fill()
                .closePath()
                .beginPath()
                .arc(100, 75, 50, 0, 1.5 * Math.PI)
                .setStrokeStyle('#333333')
                .stroke()
                .closePath();
        });
    }
});
