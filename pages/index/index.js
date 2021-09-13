// index.js
// 获取应用实例
let app = getApp()
let API = require('../../utils/listapi.js')
Page({
  data: {
    // 以下是微信登录相关
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    // 以上是微信登录相关
    sum_num: 0,
    menuArr: [],
    menuArr2: [],
    index: false,
    food_info_addnum: '',
    aa: '',
    bt_desc: '暂未选购商品',
    bt_desc_right: '¥0.1起送',
    bt_desc_rightCss: 'bt_desc_rightCss_not',
    shopCarPicView: 'shopCarPicView',
    choseSpTypeCss: 'choseSpType',
    isShowShopCar: true,
    count1: 0,
    shopCarNum: 0,
    isListHasThings: false,
    shopCarList2: [],
    spicyOrNot: '不辣',
    spicyOrNot2: '不辣',
    shopCarList: [],
    isTouchShopCar: true,
    spicyChose: 'bt_spicy_notChose',
    notSpicyChose: 'bt_notSpicy',
    spicyChose2: 'bt_spicy_notChose',
    notSpicyChose2: 'bt_notSpicy',
    foodNum: 0,
    foodNum_save: 0,
    maoDian: 0,
    getChoseTypeInfo: '',
    top: 0,
    showModalStatus: false,
    showModalStatus_choseType: false,
    showModalStatus_login: false,
    showModalStatus_shopCar: false,
    peisongInfo: '起送价 ¥0.1 丨 配送费 ¥0 起',
    shopName: '辉煌美食大学城青蓝致远饭...',
    tips: '公告：盟友外卖2.0全新升级由青蓝致远提供技术支持！先点几拼...',
    chosemenuLeft: "menuLeftFixed",
    chosemenuRight: "menuRight",
    orderleft1: 'order_left1-1',
    orderleft2: 'order_left2-2',
    isDelShopCar: true,
    motto: 'Hello World',
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  scroll(e) {
    this.top = e.detail.scrollTop;
    console.log('top距离', this.top)
    if (this.top > 220) {
      console.log('大于220了！')
      this.setData({
        chosemenuLeft: "menuLeft",
        chosemenuRight: 'menuRightFixed'
      })
    } else {
      console.log('又小于220了！')
      this.setData({
        chosemenuLeft: "menuLeftFixed",
        chosemenuRight: 'menuRight'
      })
    }
  },

  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.choseFoodOverList = ''
    app.globalData.totalPrice = ''
    this.data.sum_num = 0
    console.log('that.app.globalData.choseFoodOverList', app.globalData.choseFoodOverList)
    console.log('that.app.globalData.totalprice', app.globalData.totalPrice)
  },

  onLoad() {
    wx.request({
      url: 'http://api.easou.com/api/bookapp/searchdzh.m', 
      data: {
        word: '道君',
        page_id: 1,
        count: 10,
        cid:'eef_',
        os: 'ios',
        appverion:1049
      },
      success(res) {
        console.log('搜索结果',res.data)
      }
    })
    wx.request({
      url: 'https://book.easou.com/ta/showAjax.m', //仅为示例，并非真实的接口地址
      data: {
        gid: 100136491,
        esid: '',
        st: 20,
        autoPay: 2
      },
      success(res2) {
        console.log('具体章节',res2.data)
      }
    })
    
    console.log('this.data.userInfo', this.data.userInfo.name)
    if (this.data.userInfo.nickName == undefined) {
      console.log(111111111)
      var animation_login = wx.createAnimation({
        duration: 0,
        timingFunction: "linear",
        delay: 0
      })
      this.animation_login = animation_login
      animation_login.translateY(300).step()
      this.setData({
        animationData_login: animation_login.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalStatus_login: true
      })
      setTimeout(() => {
        animation_login.translateY(0).step()
        this.setData({
          animationData_login: animation_login.export(), // export 方法每次调用后会清掉之前的动画操作。
          // isShowShopCar:true
        })
        console.log(this)
      }, 0)
    }


    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // console.log('测试app', app.globalData.haha)

    // 使用 Mock,that=this,不然会提示setdata undefinded
    var that = this
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        menuArr: res.menuArr,
        menuArr2: res.menuArr2,
      })
    });
  },


  // applogin() {
  //   console.log("调用login接口，获取临时凭证")
  //   wx.login({
  //     timeout: 3000,
  //     success: function (data) {
  //       console.log("code", data);
  //       //发送临时凭证给后台换取token
  //       wx.request({
  //         url: 'https://chenmin777.xicp.vip/getLoginToken/' + data.code,
  //         success: function (data2) {
  //           console.log(data2);
  //           //将token进行保存，localStorage，要拿数据的时候携带token即可。
  //           wx.setStorage({
  //             key: "token",
  //             data: data2.data.token
  //           })
  //           wx.setStorage({
  //             key: "sid",
  //             data: data2.data.sid
  //           });




  //         }
  //       })
  //     }
  //   })
  // },

  bindViewTap() {
    const that = this
    // this.applogin()
    // wx.getUserProfile({
    //   desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: (res) => {
    //     console.log(res)
    //     that.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //     that.hideTanchuang_login()
    //     console.log('that.data.userInfo',that.data.userInfo)
    //   }
    // })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  onPageScroll: function (e) {
    console.log('e', e)
    // 滚动条当前位置
    let scrollTop = e.scrollTop
    this.setData({
      top: scrollTop
    })
  },

  jumpTo() {
    const that = this
    if (this.data.bt_desc_right == '选好了') {
      that.data.shopCarList.forEach((item, index) => {
        that.data.sum_num += item.num
        that.setData({
          sum_num: that.data.sum_num
        })
      });
      if (this.data.shopCarList[0].name == '三拼饭(先选几拼再选菜)') {
        if (that.data.sum_num < 4) {
          // 微信的alert
          wx.showModal({
            title: '温馨提示',
            content: '请选齐三个配菜！',
            showCancel: true, //默认为true,false去掉取消按钮
            confirmText: '确认', //默认是“确认”
            confirmColor: '#4994f7', //确认文字的颜色
            success: function (res) {
              if (res.cancel) {
                //点击取消按钮
                that.setData({
                  sum_num: 0
                })
              } else if (res.confirm) {
                //点击确认按钮
                that.setData({
                  sum_num: 0
                })
              }
            }
          })
        } else if (that.data.sum_num == 4) {
          wx.navigateTo({
            url: '../paymoney/paymoney',
          })
          app.globalData.choseFoodOverList = that.data.shopCarList
          app.globalData.totalPrice = that.data.bt_desc
          console.log('that.app.globalData.choseFoodOverList', app.globalData.choseFoodOverList)
          console.log('that.app.globalData.totalprice', app.globalData.totalPrice)
        } else if (that.data.sum_num > 4) {
          // 微信的alert
          wx.showModal({
            title: '温馨提示',
            content: '配菜超过三个，请不要多选！',
            showCancel: true, //默认为true,false去掉取消按钮
            confirmText: '确认', //默认是“确认”
            confirmColor: '#4994f7', //确认文字的颜色
            success: function (res) {
              if (res.cancel) {
                //点击取消按钮
                that.setData({
                  sum_num: 0
                })
              } else if (res.confirm) {
                //点击确认按钮
                that.setData({
                  sum_num: 0
                })
              }
            }
          })
        }
      }

      if (this.data.shopCarList[0].name == '四拼饭(先选几拼再选菜)') {
        if (that.data.sum_num < 5) {
          // 微信的alert
          wx.showModal({
            title: '温馨提示',
            content: '请选齐四个配菜！',
            showCancel: true, //默认为true,false去掉取消按钮
            confirmText: '确认', //默认是“确认”
            confirmColor: '#4994f7', //确认文字的颜色
            success: function (res) {
              if (res.cancel) {
                //点击取消按钮
                that.setData({
                  sum_num: 0
                })
              } else if (res.confirm) {
                //点击确认按钮
                that.setData({
                  sum_num: 0
                })
              }
            }
          })
        } else if (that.data.sum_num == 5) {
          wx.navigateTo({
            url: '../paymoney/paymoney',
          })
          app.globalData.choseFoodOverList = that.data.shopCarList
          app.globalData.totalPrice = that.data.bt_desc
          console.log('that.app.globalData.choseFoodOverList', app.globalData.choseFoodOverList)
        } else if (that.data.sum_num > 5) {
          // 微信的alert
          wx.showModal({
            title: '温馨提示',
            content: '配菜超过四个，请不要多选！',
            showCancel: true, //默认为true,false去掉取消按钮
            confirmText: '确认', //默认是“确认”
            confirmColor: '#4994f7', //确认文字的颜色
            success: function (res) {
              if (res.cancel) {
                //点击取消按钮
                that.setData({
                  sum_num: 0
                })
              } else if (res.confirm) {
                //点击确认按钮
                that.setData({
                  sum_num: 0
                })
              }
            }
          })
        }
      }
    }
  },

  clearShopList() {
    var arry = this.data.menuArr
    arry.forEach(item => {
      item.num = 0
      item.isShowZero = false
    })
    this.setData({
      sum_num: 0,
      count1: 0,
      menuArr: arry,
      shopCarList: [],
      isListHasThings: false,
      choseSpTypeCss: 'choseSpType',
      bt_desc_rightCss: 'bt_desc_rightCss_not',
      shopCarPicView: "shopCarPicView",
      bt_desc: '暂未选购商品',
      bt_desc_right: '¥0.1起送',
      aa: ''
    })
    this.hideTanchuang_shopCar()
  },

  choseReady() {
    // 用一个布尔值 isListHasThings:false
    // 如果里面没东西（默认false没东西）
    // if (this.data.isListHasThings == false) {
    this.data.count1 += 1
    this.hideTanchuang_choseType()
    console.log('三拼', this.data.spicyOrNot)
    console.log('四拼', this.data.spicyOrNot2)
    console.log(this.data.count1)
    const object = {}
    object.name = this.data.getChoseTypeInfo.name
    object.price = this.data.getChoseTypeInfo.price
    object.spicy = this.data.spicyOrNot
    object.num = this.data.count1
    object.pic = this.data.getChoseTypeInfo.pic
    this.data.shopCarList.push(object)
    this.data.shopCarList.forEach(item => {
      this.data.aa += item.price
    });
    // }
    console.log('shopcarlist', this.data.shopCarList)
    console.log('count1', this.data.count1)
    this.setData({
      count: this.data.count1,
      shopCarList: this.data.shopCarList,
      choseSpTypeCss: 'choseSpType_not',
      isListHasThings: true,
      shopCarPicView: "shopCarPicView_not",
      bt_desc: this.data.aa,
      bt_desc_right: '选好了',
      bt_desc_rightCss: 'bt_desc_rightCss',
    })
  },

  choseSpicy(bt_spicy) {
    // 分别获取辣或者不辣
    console.log(this.data.getChoseTypeInfo.spicy)
    if (this.data.getChoseTypeInfo.name == '三拼饭(先选几拼再选菜)') {
      this.setData({
        spicyChose: 'bt_spicy',
        notSpicyChose: 'bt_notSpicy_notChose',
        spicyOrNot: '辣'
      })
    } else {
      this.setData({
        spicyChose2: 'bt_spicy',
        notSpicyChose2: 'bt_notSpicy_notChose',
        spicyOrNot2: '辣'
      })
    }
  },


  choseNotSpicy(bt_notSpicy) {
    // 分别获取辣或者不辣
    console.log(this.data.getChoseTypeInfo.notSpicy)
    if (this.data.getChoseTypeInfo.name == '三拼饭(先选几拼再选菜)') {
      this.setData({
        spicyChose: 'bt_spicy_notChose',
        notSpicyChose: 'bt_notSpicy',
        spicyOrNot: '不辣'
      })
    } else {
      this.setData({
        spicyChose2: 'bt_spicy_notChose',
        notSpicyChose2: 'bt_notSpicy',
        spicyOrNot2: '不辣'
      })
    }

  },

  reduceNumTc(foodinfo) {
    // console.log(foodinfo.currentTarget.dataset.foodinfo)
    var food_info = foodinfo.currentTarget.dataset.foodinfo
    // console.log(food_info)
    var menuArr2 = JSON.parse(JSON.stringify(this.data.menuArr2))
    menuArr2.forEach(item => {
      if (item.name == food_info.name & item.num > 0) {
        console.log('item', item)
        item.num -= 1
        if (item.num < 1) {
          item.isShowZero = false
        }
      }
    });
    this.setData({
      menuArr2
    })
  },

  addNumTc(foodinfo) {
    var food_info = foodinfo.currentTarget.dataset.foodinfo
    var menuArr2 = this.data.menuArr2
    menuArr2.forEach(item => {
      if (item.name == food_info.name) {
        console.log('item', item)
        item.num += 1
        if (item.num >= 1) {
          item.isShowZero = true
        }
      }
    });
    this.setData({
      menuArr2
    })
  },

  reduceNum(foodinfo) {
    var food_info = foodinfo.currentTarget.dataset.foodinfo
    this.data.menuArr.forEach(item => {
      if (item.name == food_info.name & item.num >= 1) {
        console.log('item', item)
        item.num -= 1
        for (var x = 0; x < this.data.menuArr.length; x++) {
          for (var y = 0; y < this.data.shopCarList.length; y++) {
            if (this.data.menuArr[x].name == this.data.shopCarList[y].name & this.data.menuArr[x].id !== 1 & this.data.menuArr[x].id !== 2) {
              this.data.shopCarList[y].num = this.data.menuArr[x].num
              this.setData({
                shopCarList: this.data.shopCarList
              })
            }
          }
        }
      }
      this.setData({
        menuArr: this.data.menuArr
      })
      if (item.name == food_info.name & item.num == 0) {
        this.data.shopCarList.forEach((item2, index) => {
          if (item2.name == item.name) {
            this.data.shopCarList.splice(index, 1)
            item.isShowZero = false
            this.setData({
              shopCarList: this.data.shopCarList
            })
          }
        })
      }
    })
    console.log('this.data.shoplist', this.data.shopCarList)
  },

  addNum(foodinfo) {
    if (this.data.isListHasThings == true) {
      var food_info = foodinfo.currentTarget.dataset.foodinfo
      var menuArr = this.data.menuArr
      menuArr.forEach(item => {
        if (item.name == food_info.name) {
          console.log('item', item)
          item.num += 1
          item.isShowZero = true
          this.setData({
            food_info_addnum: item
          })
        }
      });

      this.data.shopCarList.forEach(item => {
        console.log('foreach', item)
        var arry = []
        arry.push(item.name)
        this.setData({
          index: arry.includes(this.data.food_info_addnum.name, arry.length)
        })
      });
      if (this.data.index == false) {
        var object = this.data.food_info_addnum
        this.data.shopCarList.push(object)
        // 以下为去重
        let deWeightThree = () => {
          let map = new Map();
          for (let item of this.data.shopCarList) {
            if (!map.has(item.name)) {
              map.set(item.name, item);
            }
          }
          return [...map.values()];
        }
        let newArr3 = deWeightThree();
        console.log('newArr3', newArr3);
        // 以上为去重
        this.setData({
          shopCarList: newArr3,
        })
        var menu_Arr = this.data.menuArr
        var shop_CarList = this.data.shopCarList
        for (var x = 0; x < menu_Arr.length; x++) {
          for (var y = 0; y < shop_CarList.length; y++) {
            if (menu_Arr[x].name == shop_CarList[y].name & menu_Arr[x].id !== 1 & menu_Arr[x].id !== 2) {
              shop_CarList[y].num = menu_Arr[x].num
              this.setData({
                shopCarList: this.data.shopCarList
              })
            }
          }
        }
      }
      this.setData({
        menuArr
      })
      // }
      console.log('food_info_addnum', this.data.food_info_addnum)
      console.log('shopcarlist', this.data.shopCarList)
    } else {
      // 微信的alert
      wx.showModal({
        title: '温馨提示',
        content: '请先选三拼或四拼哦！',
        showCancel: true, //默认为true,false去掉取消按钮
        confirmText: '确认', //默认是“确认”
        confirmColor: '#4994f7', //确认文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消按钮
          } else if (res.confirm) {
            //点击确认按钮
          }
        }
      })
    }
  },

  clickleft1() {
    this.setData({
      orderleft1: 'order_left1-1',
      orderleft2: 'order_left2-2',
      maoDian: 221,
    })
  },

  clickleft2() {
    this.setData({
      orderleft1: 'order_left1-2',
      orderleft2: 'order_left2-1',
      maoDian: 2088,
    })
  },

  // 底部弹出呼叫
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '134-1802-9711' //仅为示例，并非真实的电话号码
    })
  },

  choseSpType(foodinfo) {
    if (this.data.isListHasThings == false) {
      this.setData({
        getChoseTypeInfo: foodinfo.currentTarget.dataset.foodinfo,
        isShowShopCar: false
      })
      console.log(this.data.getChoseTypeInfo)
      console.log(foodinfo)
      // 显示遮罩层
      var animation_choseType = wx.createAnimation({
        duration: 0,
        /**
         * http://cubic-bezier.com/ 
         * linear 动画一直较为均匀
         * ease 从匀速到加速在到匀速
         * ease-in 缓慢到匀速
         * ease-in-out 从缓慢到匀速再到缓慢
         * 
         * http://www.tuicool.com/articles/neqMVr
         * step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
         * step-end 保持 0% 的样式直到动画持续时间结束 一闪而过
         */
        timingFunction: "linear",
        delay: 0
      })
      this.animation_choseType = animation_choseType
      animation_choseType.translateY(300).step()
      this.setData({
        animationData_choseType: animation_choseType.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalStatus_choseType: true
      })
      setTimeout(() => {
        animation_choseType.translateY(0).step()
        this.setData({
          animationData_choseType: animation_choseType.export(), // export 方法每次调用后会清掉之前的动画操作。
          // isShowShopCar:true
        })
        console.log(this)
      }, 0)
      this.setData({
        // shopCarList:
      })
    }

  },

  hideTanchuang_shopCar() {
    // 隐藏遮罩层
    var animation_shopCar = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation_shopCar = animation_shopCar
    animation_shopCar.translateY(300).step()
    this.setData({
      animationData_shopCar: animation_shopCar.export(),
    })
    setTimeout(function () {
      animation_shopCar.translateY(0).step()
      this.setData({
        animationData_shopCar: animation_shopCar.export(),
        showModalStatus_shopCar: false,
        isTouchShopCar: true
      })
      console.log(this)
    }.bind(this), 200)
  },

  clickShopCar() {
    if (this.data.isTouchShopCar == true) {
      if (this.data.isListHasThings == true) {
        // 显示遮罩层
        var animation_shopCar = wx.createAnimation({
          duration: 200,
          timingFunction: "ease",
          delay: 0
        })
        this.animation_shopCar = animation_shopCar
        animation_shopCar.translateY(300).step()
        this.setData({
          animationData_shopCar: animation_shopCar.export(), // export 方法每次调用后会清掉之前的动画操作。
          showModalStatus_shopCar: true
        })
        setTimeout(() => {
          animation_shopCar.translateY(0).step()
          this.setData({
            animationData_shopCar: animation_shopCar.export(), // export 方法每次调用后会清掉之前的动画操作。
            isTouchShopCar: false
          })
          console.log(this)
        }, 200)
      }
    } else {
      this.hideTanchuang_shopCar()
      this.setData({
        isTouchShopCar: true
      })
    }
  },

  hideTanchuang_login() {
    // 隐藏遮罩层
    if (this.data.userInfo.nickName !== undefined) {
      var animation_login = wx.createAnimation({
        duration: 0,
        timingFunction: "ease",
        delay: 0
      })
      this.animation_login = animation_login
      animation_login.translateY(300).step()
      this.setData({
        animationData_login: animation_login.export(),
      })
      setTimeout(function () {
        animation_login.translateY(0).step()
        this.setData({
          animationData_login: animation_login.export(),
          showModalStatus_login: false,
          isShowShopCar: true
        })
        console.log(this)
      }.bind(this), 0)
    } else {
      // 微信的alert
      wx.showModal({
        title: '温馨提示',
        content: '请先授权登录',
        showCancel: true, //默认为true,false去掉取消按钮
        confirmText: '确认', //默认是“确认”
        confirmColor: '#4994f7', //确认文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消按钮
          } else if (res.confirm) {
            //点击确认按钮
          }
        }
      })
    }
  },

  hideTanchuang_choseType() {
    // 隐藏遮罩层
    var animation_choseType = wx.createAnimation({
      duration: 0,
      timingFunction: "ease",
      delay: 0
    })
    this.animation_choseType = animation_choseType
    animation_choseType.translateY(300).step()
    this.setData({
      animationData_choseType: animation_choseType.export(),
    })
    setTimeout(function () {
      animation_choseType.translateY(0).step()
      this.setData({
        animationData_choseType: animation_choseType.export(),
        showModalStatus_choseType: false,
        isShowShopCar: true
      })
      console.log(this)
    }.bind(this), 0)
  },
  // 以下是底部弹出呼叫


  // 以下是底部弹出js
  touchTopDesc() {
    this.setData({
      isShowShopCar: false
    })
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 0,
      /**
       * http://cubic-bezier.com/ 
       * linear 动画一直较为均匀
       * ease 从匀速到加速在到匀速
       * ease-in 缓慢到匀速
       * ease-in-out 从缓慢到匀速再到缓慢
       * 
       * http://www.tuicool.com/articles/neqMVr
       * step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       * step-end 保持 0% 的样式直到动画持续时间结束 一闪而过
       */
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
      showModalStatus: true,
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        // isShowShopCar:true
      })
      console.log(this)
    }, 0)
  },

  hideTanchuang() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        isShowShopCar: true
      })
      console.log(this)
    }.bind(this), 0)
  },
})