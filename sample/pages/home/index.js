Page({
    handleTapSampleRadar () {
        wx.navigateTo({ url: '/pages/canvas-radar/index' });
    },

    handleTapSampleRectangle () {
        wx.navigateTo({ url: '/pages/canvas-rectangle/index' });
    },

    handleTapSampleBezier () {
        wx.navigateTo({ url: '/pages/canvas-bezier/index' });
    },

    handleTapSampleGradient () {
        wx.navigateTo({ url: '/pages/canvas-gradient/index' });
    },

    handleTapSampleDeformation () {
        wx.navigateTo({ url: '/pages/canvas-deformation/index' });
    },

    handleTapSampleRoundImage () {
        wx.navigateTo({ url: '/pages/canvas-roundimg/index' });
    },

    handleTapSampleTextWrap () {
        wx.navigateTo({ url: '/pages/canvas-textwrap/index' });
    }
});
