const db = wx.cloud.database();
import {
  DataList
} from '../../pages/index-menu/utils'
Component({
  properties: {
    currentType: {
      type: Array
    },
    currentStoreData: {
      type: Array
    },
    potType: String,
    titleName: String,
    listenEvent: String,
    listenAdd: Object,
    listenReduce: Object
  },
  data: {
    isChange: true,
    potStoreData: [],
    vegeStoreData: [],
    goodsCount: {}
  },
  methods: {
    addCountEvent(e) {
      // console.log('add',e.currentTarget.dataset.type)
      let currType = e.currentTarget.dataset.type;
      let index = this.properties.potType;
      let len = 0;
      if (this.data.potStoreData.length > 0) {
        this.data.potStoreData.forEach(element => {
          len = len + element.count;
        });
      }

      if (currType.judge == "pot") {
        if (index == 0) {
          if (len == 0) {
            // console.log(1111111)
            this.commontShareData(this.properties.currentType, currType);
          } else {
            wx.showToast({
              title: '只能选择一个锅底',
            });
            return;
          }
        } else {
          if (index == 1) {
            if (len < 2) {
              // console.log(22222222222)
              this.commontShareData(this.properties.currentType, currType);
            } else {
              wx.showToast({
                title: '最多选择两个锅底',
              })
              return;
            }
          } else {
            if (len < 4) {
              // console.log(3333333333333333)
              this.commontShareData(this.properties.currentType, currType);
            } else {
              wx.showToast({
                title: '最多选择四个锅底',
              })
              return;
            }
          }
        }
        // this.triggerEvent('touchImageEvent',this.properties.currentType)
      } else {
        // console.log('4444444444444',this.properties.currentType)
        this.commontShareData(this.properties.currentType, currType)
      }
    },
    reduceCountEvent(e) {
      let currReduce = e.currentTarget.dataset.reduce;
      let temperArr = this.data.currentType;
      let temperStore = [];
      let goodsCount = this.data.goodsCount;
      let titleName = this.properties.titleName;
      // console.log('weizhi.....', goodsCount, currReduce);
      let temperSt1 = [];
      let temperSt2 = []
      temperStore = temperArr.map(item => {
        if (item.titleDishes == currReduce.titleDishes) {
          if (item.judge == 'pot') {
            let find = this.data.potStoreData.find(i => i.titleDishes == currReduce.titleDishes);
            let a = [];
            if (find?.count > 0) {

              a = this.data.potStoreData.map(j => {
                if (j.titleDishes == find.titleDishes) {
                  return {
                    ...j,
                    count: j.count - 1
                  }
                } else {
                  return j
                }
              })
              // console.log(11111111111,a)
            } else {
              a = this.data.potStoreData.filter(it => {
                return it.titleDishes != find.titleDishes;
              })
              // console.log(22222222222222, a);
            }
            this.setData({
              potStoreData: [...a]
            })
            temperSt1 = a
            // console.log('redsdsd===>', this.data.potStoreData)
            // goodsCount[titleName] = this.data.goodsCount[titleName]-1;
          } else {
            let b = this.data.vegeStoreData;
            let find = b.find(it => it.titleDishes == currReduce.titleDishes);
            let c = [];
            // console.log('find==>',find);
            if (find?.count > 0) {
              // find = {
              //   ...find,
              //   count: find.count - 1
              // };
              c = this.data.vegeStoreData.map(j => {
                if (j.titleDishes == find.titleDishes) {
                  return {
                    ...j,
                    count: j.count - 1
                  }
                } else {
                  return j
                }

              })
              // console.log('c===>', c);
              // console.log('a===>',find)
            } else {
              // c = this.data.vegeStoreData.filter(it => {
              //   return it.titleDishes != currReduce.titleDishes
              // });
              let red = currReduce.count - 1
              let obj = {
                ...currReduce,
                count: red
              };
              c = [obj]
              // console.log('b==>',c);
            }
            temperSt2 = c
            this.setData({
              vegeStoreData: [...c]
            })
          }

          goodsCount[titleName] = (this.data.goodsCount[titleName] ? this.data.goodsCount[titleName] - 1 : 0);
          // console.log('item==>',item.count,item);
          return {
            ...item,
            count: item.count - 1
          }
        } else {
          return item;
        }
      })
      let a = goodsCount;
      let obj = {};
      obj[titleName] = temperStore
      this.triggerEvent('computedGoodsEvent', {
        goodsCount,
        updata: obj,
        index: this.properties.potType,
        potStoreData: temperSt1,
        vegeStoreData: temperSt2
      });
      this.setData({
        currentType: temperStore,
        goodsCount: a
      })
      // console.log("data==>",goodsCount,this.data.goodsCount,a);
      // console.log('all====>',temperSt1,temperSt2, this.data.vegeStoreData, this.data.potStoreData);
    },
    commontShareData(value, type) {
      let currArr = [];
      let temper = this.data.potStoreData;
      let vegeTemper = this.data.vegeStoreData;
      let goodsCount = this.data.goodsCount;
      let titleName = this.properties.titleName;
      // console.log('test========>',goodsCount,value);
      if (type.judge == 'pot') {
        currArr = value.map(it => {
          if (it.titleDishes == type.titleDishes) {
            let fds = temper.findIndex(z => z.titleDishes == type.titleDishes);
            if (fds != -1) {
              temper = temper.map(ze => {
                if (ze.titleDishes == type.titleDishes) {
                  return {
                    ...ze,
                    count: ze.count + 1
                  }
                } else {
                  return ze
                }
              })
            } else {
              temper.push({
                ...it,
                count: it.count + 1
              });
            }
            return {
              ...it,
              count: it.count + 1
            }
          } else {
            return it;
          }

        });
      } else {
        // console.log('jinglailel')
        currArr = value.map(it => {
          if (it.titleDishes == type.titleDishes) {
            // console.log('4444rrrrr',vegeTemper)
            if (vegeTemper.length == 0) {
              // console.log('5555555')
              vegeTemper.push({
                ...it,
                count: it.count + 1
              });
              // console.log('第一',vegeTemper);
            } else {
              // console.log('66666');
              let tfind = vegeTemper.findIndex(y => y.titleDishes == type.titleDishes);
              if (tfind != -1) {
                vegeTemper = vegeTemper.map(item => {
                  if (item.titleDishes == type.titleDishes) {
                    return {
                      ...item,
                      count: it.count + 1
                    }
                  } else {
                    return item
                  }
                })
              } else {
                vegeTemper.push({
                  ...it,
                  count: it.count + 1
                })
              }

              // console.log('第二',vegeTemper);

            }
            return {
              ...it,
              count: it.count + 1
            }
          } else {
            return it;
          }
        });
        // console.log('test======>',vegeTemper);
      }
      goodsCount[titleName] = (this.data.goodsCount[titleName] ? this.data.goodsCount[titleName] : 0) + 1;
      let obj = {};
      obj[titleName] = currArr
      this.triggerEvent('computedGoodsEvent', {
        goodsCount,
        updata: obj,
        index: this.properties.potType,
        potStoreData: temper,
        vegeStoreData: vegeTemper
      });

      // console.log('触发中.....是的',goodsCount[titleName]);


      this.setData({
        currentType: currArr,
        potStoreData: temper,
        vegeStoreData: vegeTemper,
        goodsCount
      })
      // console.log('当前的goods==>', this.data.vegeStoreData);
    },
  },
  observers: {
    currentStoreData() {
      let count = 0
      this.data.currentType.map(it => {
        if (it.count > 0) {
          count = count + it.count
        }
        return it;
      })
      let titleName = this.properties.titleName
      let o = {};
      o[titleName] = count

      // console.log('up===>',DataList,this.properties.currentType);
      // goodsCount[titleName] =0;
      let cura = DataList[0].selectType[this.properties.potType].varietyDishes;
      let oj = {};
      oj['锅底'] = cura;
      let j = {};
      j['锅底'] = 0
      // console.log('item======>',{...goodsCount,...j})
      this.triggerEvent('computedGoodsEvent', {
        goodsCount: {
          ...goodsCount,
          ...j
        },
        updata: oj,
        index: 'change',
        potStoreData: this.data.potStoreData,
        vegeStoreData: this.data.vegeStoreData
      });
      let goodsCount = {
        ...this.data.goodsCount,
        ...o,
        ...j
      };
      // console.log('sdflsj=>',goodsCount);
      if (titleName != '锅底') {
        let storeCurrentValue = this.properties.currentType;
        storeCurrentValue = storeCurrentValue.filter(it => {
          return it.count != 0
        })
        this.setData({
          vegeStoreData: storeCurrentValue,
          // goodsCount:this.data.goodsCount
        })
        let obj = {};
        obj[titleName] = this.data.currentType;
        this.triggerEvent('computedGoodsEvent', {
          goodsCount,
          updata: obj,
          index: this.properties.potType,
          potStoreData: this.data.potStoreData,
          vegeStoreData: this.data.vegeStoreData
        });
        // console.log('test=====>',storeCurrentValue)
      }
      this.setData({
        potStoreData: this.properties.currentStoreData,
        goodsCount
      })
      // console.log('触发了.........',this.properties.currentType)
      // console.log('chufa...')
    },
    listenAdd() {
      if (this.properties.listenAdd.type) {
        let findCurrent = this.properties.listenAdd.currentTarget.dataset.type.judge
        console.log('触发事件中....',findCurrent)
        if (findCurrent == 'pot') {
          let allC = 0
          this.properties.currentType.forEach(it => {
            if (it.judge == 'pot') {
              allC = allC + it.count;
            }
          })
          if (this.properties.potType == 0) {
            if (allC < 0) {
              this.addCountEvent(this.properties.listenAdd)
            } else {
              wx.showToast({
                title: '只能选择一个锅底',
              });
              return;
            }
          }
          if (this.properties.potType == 1) {
            if (allC < 1) {
              this.addCountEvent(this.properties.listenAdd)
            } else {
              wx.showToast({
                title: '最多选择两个锅底',
              })
              return;
            }
          }
          if (this.properties.potType = 2) {
            if (allC < 3) {
              this.addCountEvent(this.properties.listenAdd)
            } else {
              wx.showToast({
                title: '最多选择四个锅底',
              })
              return;
            }
          }

        }else{
          this.addCountEvent(this.properties.listenAdd)
        }
      }
    },
    listenReduce() {
      // console.log(this.properties.listenReduce);
      if (this.properties.listenReduce.type) {
        this.reduceCountEvent(this.properties.listenReduce);
      }
    }
  },
  lifetimes: {
    created() {}
  }
})