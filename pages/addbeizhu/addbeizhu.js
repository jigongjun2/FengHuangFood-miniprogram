let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxNumber:50,
    number: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  inputText(e) { //监听输入，实时改变已输入字数
    console.log(e)
    let value = e.detail.value;//获取textarea的内容，
    let len = value.length;//获取textarea的内容长度
    this.setData({
      'number': len
    })
  },

  bindFormSubmit: function(e) {
      console.log(e.detail.value.textarea)
      app.globalData.beizhu_desc=e.detail.value.textarea
      console.log('app.globalData.beizhu_desc',app.globalData.beizhu_desc)
      wx.navigateBack({
        delta:1,
      })
    }
})