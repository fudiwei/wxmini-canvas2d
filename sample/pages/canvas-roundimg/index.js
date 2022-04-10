Page({
    onReady () {
        this.$refs = Object.assign({}, this.$refs, {
            avatar: this.selectComponent('#avatar')
        });
    },

    handleTapChooseImage () {
        wx.chooseImage({
            success: (res) => {
                this.$refs['avatar'].draw(res.tempFilePaths[0]);
            }
        });
    }
});
