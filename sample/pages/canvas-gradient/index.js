const { FluentCanvas2D } = require('../../libs/wxmini-canvas.min.js');

Page({
    onReady () {
        FluentCanvas2D.select('#myCanvas1', (fcanvas) => {
            // Create linear gradient
            const gradient = fcanvas.createLinearGradient(0, 0, 200, 0);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(1, 'white');

            // Fill with gradient
            fcanvas
                .setFillStyle(gradient)
                .fillRect(10, 10, 150, 80);
        });

        FluentCanvas2D.select('#myCanvas2', (fcanvas) => {
            // Create linear gradient
            const gradient = fcanvas.createLinearGradient(0, 0, 200, 0);
            gradient.addColorStop(0, 'yellow');
            gradient.addColorStop(0.5, 'red');
            gradient.addColorStop(1, 'blue');

            // Fill with gradient
            fcanvas
                .setStrokeStyle(gradient)
                .setLineWidth(10)
                .beginPath()
                .moveTo(10, 10)
                .lineTo(200, 200)
                .stroke();
        });
    }
});
