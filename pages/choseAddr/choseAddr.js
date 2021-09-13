// pages/choseAddr/choseAddr.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxAdAddrList: [],
    addrList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log('app.addrlist',app.globalData.addrList)

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
    this.setData({
      addrList: app.globalData.addrList
    })
    console.log('choseAddr接收的addrList', this.data.addrList)
    // this.data.addrList.forEach(item => {
    //   console.log('addrList item',item[0])
    // });
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

  confirmChoseAddr(res) {
    console.log('res', res.currentTarget.dataset.choseitem)
    app.globalData.choseAddr_chose = res.currentTarget.dataset.choseitem
    wx.navigateBack({
      delta: 1,
    })
  },

  del(res) {
    const that = this
    console.log('res', res.currentTarget.dataset.clickitem)
    let clickitem = res.currentTarget.dataset.clickitem
    // let addrList=this.data.addrList
    // 微信的alert
    wx.showModal({
      title: '温馨提示',
      content: '是否确定删除此条地址信息！',
      showCancel: true, //默认为true,false去掉取消按钮
      confirmText: '确认', //默认是“确认”
      confirmColor: '#4994f7', //确认文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消按钮
        } else if (res.confirm) {
          //点击确认按钮
          that.data.addrList.forEach((item, index) => {
            if (item[0].choseTag == clickitem.choseTag & item[0].location == clickitem.location & item[0].menpaiNum == clickitem.menpaiNum & item[0].phoneNum == clickitem.phoneNum & item[0].name == clickitem.name) {
              console.log('item[0]', item)
              console.log('index', index)
              that.data.addrList.splice(index, 1)
              app.globalData.addrList = that.data.addrList
              that.setData({
                addrList: that.data.addrList
              })
              wx.removeStorage({
                key: 'addrList',
                success(res) {
                  that.setData({
                    storageData: []
                  })
                }
              })
              wx.setStorage({
                key: "addrList",
                data: app.globalData.addrList
              })
            }
          });
        }
      }
    })
  },

  edit(clickitem) {
    app.globalData.addrList_readyEdit = '',
      app.globalData.index = '',
      app.globalData.addrList_readyEdit = clickitem.currentTarget.dataset.clickitemedit
    app.globalData.index = clickitem.currentTarget.dataset.index
    console.log('choseclick', app.globalData.addrList_readyEdit)
    wx.navigateTo({
      url: '../editAddr/editAddr',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: clickitem
        })
      }
    })
  },

  chose_addr_wx() {
    const that=this
    wx.chooseAddress({
      success(res) {
        let aa = {}
        aa.name = res.userName
        aa.phoneNum = res.telNumber
        aa.location = res.provinceName+res.cityName+res.countyName
        aa.menpaiNum = res.detailInfo
        // aa.choseTag = '公司'
        // aa.tagClass = 'tagCompany'
        that.data.wxAdAddrList.push(aa)
        that.setData({
          wxAdAddrList: that.data.wxAdAddrList
        })
        console.log('this.data.wxAdAddrList', that.data.wxAdAddrList)
        app.globalData.addrList.push(that.data.wxAdAddrList)
        console.log('app.globalData.addrList', app.globalData.addrList)
        wx.setStorage({
          key: "addrList",
          data: app.globalData.addrList
          // 让缓存里先有一组数组
        })
      }
    })
  },
  toEditAddr() {
    wx.navigateTo({
      url: '../addAddr/addAddr',
    })
  }
})