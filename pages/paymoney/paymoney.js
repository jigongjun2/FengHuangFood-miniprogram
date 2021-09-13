// pages/addrAndTime/addrAndTime.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distance:'',
    showModalStatus_pay: false,
    shopList: '',
    beizhu_desc: '口味、偏好',
    choseAddr_chose: '',
    addrList: '',
    tips: '请选择收货地址',
    multiArray: [
      ['今天', '明天', '后天'],
      ['尽快送达', '30分钟后', '一小时后', '一个半小时后', '两小时后']
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '今天'
        },
        {
          id: 1,
          name: '明天'
        },
        {
          id: 2,
          name: '后天'
        }
      ],
      [{
          id: 0,
          name: '尽快送达'
        },
        {
          id: 1,
          name: '30分钟后'
        },
        {
          id: 2,
          name: '一小时后'
        },
        {
          id: 3,
          name: '一个半小时后'
        },
        {
          id: 3,
          name: '两半小时后'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
  },

  toChoseAddr() {
    wx.navigateTo({
      url: '../choseAddr/choseAddr',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'test'
        })
      }
    })
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
    const that = this
    console.log('app.globalData.choseAddr_chose', app.globalData.choseAddr_chose)
    if (app.globalData.beizhu_desc !== '') {
      that.setData({
        beizhu_desc: app.globalData.beizhu_desc
      })
    }
    this.setData({
      totalPrice: app.globalData.totalPrice,
      shopList: app.globalData.choseFoodOverList,
      choseAddr_chose: app.globalData.choseAddr_chose,
    })
    console.log('shopList', this.data.shopList)
    console.log('total', this.data.totalPrice)
    console.log('this.choseAddr_chose', this.data.choseAddr_chose)
    console.log('this.beizhu_desc', this.data.beizhu_desc)
    // 保留指向
    wx.getStorage({
      key: 'addrList',
      success(res) {
        // console.log('res.data',res.data)
        // 这里如果用this.data.addrList指向的是wx.getstorage

        // 每次设置一下app里的addrList，用来做增加删除的媒介，通过把app内的addrList推到storage里来达到增加删除的目的
        // 删除的话就是通过删除app里的表
        app.globalData.addrList = res.data
        // 默认展示addrList里的第一条地址信息
        that.setData({
          addrList: app.globalData.addrList[0],
          // choseAddr_chose:app.globalData.choseAddr_chose,
        })
        console.log('pay', that.data.addrList)
        console.log('pay-app', app.globalData.addrList)
        console.log("app.globalData", app.globalData)

        if (app.globalData.addrList.length < 1) {
          that.setData({
            choseAddr_chose: '',
            tips: '请选择收货地址'
          })
        }

        if (app.globalData.addrList.length == 1) {
          that.setData({
            choseAddr_chose: app.globalData.addrList[0][0],
            tips: ''
          })
        }

        if (app.globalData.addrList.length > 1) {
          if (app.globalData.choseAddr_chose == '') {
            that.setData({
              choseAddr_chose: app.globalData.addrList[0][0],
              tips: ''
            })
          }
          if (app.globalData.choseAddr_chose !== '') {
            that.setData({
              choseAddr_chose: app.globalData.choseAddr_chose,
              tips: ''
            })
          }
        }
      }
    })
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

  findXy() { //获取用户的经纬度
    const that=this
    wx.getLocation({
        type: 'wgs84',
        success(res) {
            that.getDistance(res.latitude, res.longitude, 23.055475,113.41734)
        }
    })
},

 Rad: function(d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
},
getDistance: function(lat1, lng1, lat2, lng2) {
    // lat1用户的纬度
    // lng1用户的经度
    // lat2商家的纬度
    // lng2商家的经度
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2) + '公里' //保留两位小数
    console.log('经纬度计算的距离:' + s)
    this.setData({
      distance:s
    })
    console.log('this.distance:' + this.data.distance)
    return s
},

apppay(){
  console.log(1111111)
  let sid = null;
  let token = null;
  new Promise(function(resolve){
  wx.getStorage({key:"sid",
  success:function(data){
    console.log(data)
    sid = data.data;
    resolve();
  }});
}).then(function(){
  wx.getStorage({key:"token",
  success:function(data){
    console.log(data);
    token = data.data;
    console.log(sid,token)

    //调用后台，生成预付单，其实此时，要从页面得到订单金额，订单号等数据，到后台创建订单
    //后台到微信创建预付单
    wx.request({
      url: 'https://chenmin777.xicp.vip/pay/'+token,
      header:{"JSESSIONID":sid},
      method:"POST",
      success:function(data3){
          console.log("data3，",data3)
          wx.requestPayment({
            "timeStamp": data3.data.timeStamp,
            "nonceStr": data3.data.nonceStr,
            "appid":data3.data.appId,
            "package": data3.data.package,
            "signType":"RSA",
            "paySign": data3.data.paySign,
            "success":function(){
              console.log("支付成功")
            }
          })
      }
    })
  }});
})
 


},

  clickTopay() {
    this.findXy()
    var animation_pay = wx.createAnimation({
      duration: 0,
      timingFunction: "linear",
      delay: 0
    })
    this.animation_pay = animation_pay
    animation_pay.translateY(300).step()
    this.setData({
      animationData_pay: animation_pay.export(), // export 方法每次调用后会清掉之前的动画操作。
      showModalStatus_pay: true
    })
    setTimeout(() => {
      animation_pay.translateY(0).step()
      this.setData({
        animationData_pay: animation_pay.export(), // export 方法每次调用后会清掉之前的动画操作。
        // isShowShopCar:true
      })
      console.log(this)
    }, 0)
  },

  hideTanchuang_pay() {
    // 隐藏遮罩层
    var animation_pay = wx.createAnimation({
      duration: 0,
      timingFunction: "ease",
      delay: 0
    })
    this.animation_pay = animation_pay
    animation_pay.translateY(300).step()
    this.setData({
      animationData_pay: animation_pay.export(),
    })
    setTimeout(function () {
      animation_pay.translateY(0).step()
      this.setData({
        animationData_pay: animation_pay.export(),
        showModalStatus_pay: false,
      })
      console.log(this)
    }.bind(this), 0)
  },

  toBeizhu() {
    wx.navigateTo({
      url: '../addbeizhu/addbeizhu',
    })
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['尽快送达', '30分钟后', '一小时后', '一个半小时后', '两小时后'];
            break;
          case 1:
            data.multiArray[1] = ['尽快送达', '30分钟后', '一小时后', '一个半小时后', '两小时后'];
            break;
          case 2:
            data.multiArray[1] = ['尽快送达', '30分钟后', '一小时后', '一个半小时后', '两小时后'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },
})