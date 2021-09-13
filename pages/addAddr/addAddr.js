// pages/editAddr/editAddr.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choseCompany:'choseCompany_not',
    choseHome:'choseHome_not',
    choseSchool:'choseSchool_not',
    inputname:'',
    phoneNum:'',
    location:"",
    menpaiNum:'',
    choseTag:'',
    addrList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
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

  submit(){
    // const that=this
    let aa={}
    aa.name=this.data.inputname
    aa.phoneNum=this.data.phoneNum
    aa.location=this.data.location
    aa.menpaiNum=this.data.menpaiNum
    aa.choseTag=this.data.choseTag
    if(this.data.choseTag=="公司"){
      aa.tagClass='tagCompany'
    }else if(this.data.choseTag=="家"){
      aa.tagClass='tagHome'
    }else if(this.data.choseTag=="学校"){
      aa.tagClass='tagSchool'
    }
    this.data.addrList.push(aa)
    this.setData({
      addrList:this.data.addrList
    })
    console.log('this.data.addrList',this.data.addrList)
    app.globalData.addrList.push(this.data.addrList)
    console.log('app.globalData.addrList',app.globalData.addrList)
    wx.setStorage({
      key:"addrList",
      data:app.globalData.addrList
      // 让缓存里先有一组数组
    })
    wx.navigateBack({
      delta:1,
    })
  },

  choseCompany(){
    this.setData({
      choseCompany:'choseCompany',
      choseHome:'choseHome_not',
      choseSchool:'choseSchool_not',
      choseTag:'公司'
    })
  },

  choseHome(){
    this.setData({
      choseCompany:'choseCompany_not',
      choseHome:'choseHome',
      choseSchool:'choseSchool_not',
      choseTag:'家'
    })
  },

  choseSchool(){
    this.setData({
      choseCompany:'choseCompany_not',
      choseHome:'choseHome_not',
      choseSchool:'choseSchool',
      choseTag:'学校'
    })
  },
  clickLocation(){
    const that=this
    wx.chooseLocation({
      success (res) {
        that.setData({
          location:res.name
        })
      }
      
    })
    
  },
})