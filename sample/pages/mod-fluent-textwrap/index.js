const { FluentCanvas2D } = require('../../libs/wxmini-canvas.min.js');

Page({
    onReady () {
        FluentCanvas2D.select('#myCanvas1').then((fcanvas) => {
            const gap = 20;
            fcanvas
                .setFillStyle('#ff4d4f')
                .fillRect(0, 0, fcanvas.getWidth(), fcanvas.getHeight())
                .setFillStyle('white')
                .setFont('16px sans-serif')
                .setTextAlign('left')
                .setTextBaseline('bottom')
                .fillTextWithWrap('对齐方式：\r\n  textAlign: left;\r\n  textBaseLine: bottom;\r\n\r\n这是一段为了为了演示自动换行（左对齐）的长文本，内容包含中英文混排，还包含 emoji 😘💕👍 或数字 1234567890。This is a long text in order to demonstrate auto word wrap (text-align: left), the content contains mixed Chinese and English, and also contains emoji 😘💕👍 or the number 1234567890.', gap, fcanvas.getHeight() - gap, fcanvas.getWidth() - gap * 2, fcanvas.getHeight() - gap * 2, '1.4em');
        });

        FluentCanvas2D.select('#myCanvas2').then((fcanvas) => {
            const gap = 20;
            fcanvas
                .setFillStyle('#52c41a')
                .fillRect(0, 0, fcanvas.getWidth(), fcanvas.getHeight())
                .setFillStyle('white')
                .setFont('16px sans-serif')
                .setTextAlign('right')
                .setTextBaseline('top')
                .fillTextWithWrap('对齐方式：\r\n  textAlign: right;\r\n  textBaseLine: top;\r\n\r\n这是一段为了为了演示自动换行（左对齐）的长文本，内容包含中英文混排，还包含 emoji 😘💕👍 或数字 1234567890。This is a long text in order to demonstrate auto word wrap (text-align: left), the content contains mixed Chinese and English, and also contains emoji 😘💕👍 or the number 1234567890.', fcanvas.getWidth() - gap, gap, fcanvas.getWidth() - gap * 2, fcanvas.getHeight() - gap * 2, '1.4em');
        });

        FluentCanvas2D.select('#myCanvas3').then((fcanvas) => {
            const gap = 20;
            fcanvas
                .setFillStyle('#1890ff')
                .fillRect(0, 0, fcanvas.getWidth(), fcanvas.getHeight())
                .setFillStyle('white')
                .setFont('16px sans-serif')
                .setTextAlign('center')
                .setTextBaseline('middle')
                .fillTextWithWrap('对齐方式：\r\n  textAlign: center;\r\n  textBaseLine: middle;\r\n\r\n这是一段为了为了演示自动换行（左对齐）的长文本，内容包含中英文混排，还包含 emoji 😘💕👍 或数字 1234567890。This is a long text in order to demonstrate auto word wrap (text-align: left), the content contains mixed Chinese and English, and also contains emoji 😘💕👍 or the number 1234567890.', fcanvas.getWidth() / 2, fcanvas.getHeight() / 2, fcanvas.getWidth() - gap * 2, fcanvas.getHeight() - gap * 2, '1.4em');
        });
    }
});
