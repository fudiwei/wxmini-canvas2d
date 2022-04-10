const { FluentCanvas2D } = require('../../libs/wxmini-canvas.min.js');

Page({
    onReady () {
        FluentCanvas2D.select('#myCanvas1', (fcanvas) => {
            // Draw points
            fcanvas
                .beginPath()
                .arc(20, 20, 2, 0, 2 * Math.PI)
                .setFillStyle('red')
                .fill()
                .closePath();

            fcanvas
                .beginPath()
                .arc(200, 20, 2, 0, 2 * Math.PI)
                .setFillStyle('lightgreen')
                .fill()
                .closePath();

            fcanvas
                .beginPath()
                .arc(20, 100, 2, 0, 2 * Math.PI)
                .arc(200, 100, 2, 0, 2 * Math.PI)
                .setFillStyle('blue')
                .fill()
                .closePath();

            fcanvas
                .setFont('12px')
                .setTextAlign('center')
                .setTextBaseline('middle')
                .setDirection('lr')
                .setFillStyle('black');

            // Draw guides
            fcanvas.beginPath().moveTo(20, 20).lineTo(20, 100).lineTo(150, 75).closePath();

            fcanvas.moveTo(200, 20).lineTo(200, 100).lineTo(70, 75).setStrokeStyle('#AAAAAA').stroke();

            // Draw quadratic curve
            fcanvas
                .beginPath()
                .moveTo(20, 20)
                .bezierCurveTo(20, 100, 200, 100, 200, 20)
                .setStrokeStyle('black')
                .stroke()
                .closePath();
        });

        FluentCanvas2D.select('#myCanvas2', (fcanvas) => {
            // Draw points
            fcanvas
                .beginPath()
                .arc(20, 20, 2, 0, 2 * Math.PI)
                .setFillStyle('red')
                .fill();

            fcanvas
                .beginPath()
                .arc(200, 20, 2, 0, 2 * Math.PI)
                .setFillStyle('lightgreen')
                .fill()
                .closePath();

            fcanvas
                .beginPath()
                .arc(20, 100, 2, 0, 2 * Math.PI)
                .setFillStyle('blue')
                .fill()
                .closePath();

            fcanvas.setFillStyle('black').setFont('12px');

            // Draw guides
            fcanvas
                .beginPath()
                .moveTo(20, 20)
                .lineTo(20, 100)
                .lineTo(200, 20)
                .setStrokeStyle('#AAAAAA')
                .stroke()
                .closePath();

            // Draw quadratic curve
            fcanvas.beginPath().moveTo(20, 20).quadraticCurveTo(20, 100, 200, 20).setStrokeStyle('black').stroke();

            fcanvas.save();
        });
    }
});
