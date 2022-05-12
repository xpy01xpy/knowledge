import style from './style.module.css'
import AMapLoader from '@amap/amap-jsapi-loader';
import React, { PureComponent } from 'react';
import { getCovidAreaList, getCovidPrompt, getCovidPointList, } from '../../utils/api';
import { Button, message, Spin } from 'antd';

class AMappage extends PureComponent {
  state = {
    mapdom:{},
    greenArr:[], // 防范区位置数组
    yellowArr:[], // 管控区位置数组
    redArr:[], // 封控区区位置数组

    // 地图更新时间
    CovidPrompt:{},
    // 疫苗接种点
    addMarkloading: true, // 数据加载
    addMarkflag: true,
    inoculation:[], // 疫苗接种点
    // 核算监测点
    addTestloading: true, // 数据加载
    addTestflag: true,
    testingList:[], // 检测点
  }

  componentDidMount(){
    AMapLoader.load({
      "key": "49dd56ec4b910f8ae149ba01e983642b", // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],   // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
        const _map = new AMap.Map("container",{ //设置地图容器id
          viewMode:"3D",         //是否为3D地图模式
          zoom: 8,                //初始化地图级别
          center:[120.232283,30.24726], //初始化地图中心点位置  默认杭州
        });
        // 这里先保存map实例，然后再请求数据，
        // 防止map的异步加载，导致数据无法渲染问题

// .amap-overlay-text-container {
//   background: red;
// }
        this.setState({ mapdom:_map },this.start)
    }).catch(() =>  message.warning('地图加载失败，请重试！'))
  }

  // 1 初始化  拉取数据
  start = () =>{
    // 1.1 获取所有位置
    getCovidAreaList().then(res=>{
      if(res.state == 200) {
        // type 1 red 2 yellow 3 green
        const redArr = [];
        const yellowArr = [];
        const greenArr = [];
        const ImportantTexts = []; // 收集重点区域数组
        // res.data 数据格式
        res.data.forEach(item=>{
          const { mapArea, type = 1, mapMarker } = item;
          if(type == 1) mapArea.path && redArr.push(mapArea.path)
          else if(type == 2) mapArea.path && yellowArr.push(mapArea.path)
          else mapArea.path && greenArr.push(mapArea.path)

          // 添加重点区域文字标记
          if(mapMarker.text) {
            if(mapMarker.position) ImportantTexts.push(mapMarker)
            else ImportantTexts.push({ ...mapMarker, position:mapArea?.path[0]  })
          }
        })
        this.setState({ greenArr, yellowArr, redArr })
        // 渲染顺序 绿色 橙色 红色 不可以乱，红色需要最后覆盖
        this.setPolygon({ data:greenArr, color:'#81d722' })  // 绿色 
        this.setPolygon({ data:yellowArr, color:'#d88c3b' }) // 橙色
        this.setPolygon({ data:redArr, color:'#ff2e00' }) // 红色
        // 设置重点区域文字
        this.setTexts(ImportantTexts)
      } else message.warning(res.msg)
    })
    // 1.2 获取更新时间和防控地址
    getCovidPrompt().then(res=>{
      if(res.state == 200) {
        this.setState({ CovidPrompt: res.data })
      } else message.warning(res.msg || '获取更新时间失败，请稍后重试')
    })
    // 1.3 获取接种点 type 1
    getCovidPointList({ type:1, })
      .then(res=> {
        const _list = this.getMarkerIcon(res.data)
        this.setState({ inoculation: _list, addMarkloading:false })
      })
    // 1.4 获取核酸检测点 type 2
    this.getTesting({ page:1 });
  }

  // 2 设向地图中插入封层
  setPolygon = (params) => {
    const { mapdom } = this.state;
    const { data, color } = params;
    // 函数内部方法利用递归去重
    const handleData = (list) => {
      // 这里第一步需要判断遍历的数据是否是数组
      // 数组的话需要进一步递归获取内部数组
      // 最底层需要返回格式化数据如下
      // {lng: 120.100266, lat: 30.37155} => [119.7167, 30.224874]
      return list instanceof Array? 
      list.map(i=> i instanceof Array ? handleData(i) : [i.lng, i.lat]):[]
    }
    // 利用返回值遍历逐个渲染
    handleData(data).forEach(item=>{
      const polygon = new AMap.Polygon({
        path: item, // 圈的点
        fillColor: color,
        strokeOpacity: 0.8,
        fillOpacity: 0.3,
        strokeColor: color,
        strokeWeight: 0.6,
      });
  
      mapdom.add(polygon);
    })
  }
  // 2.1 设置重点区域文字
  // 案例 https://lbs.amap.com/demo/javascript-api/example/marker/labelsmarker
  // 数据源 https://a.amap.com/jsapi_demos/static/demo-center/data/food_1.4.15.js
  setTexts = (list) =>{
    const { mapdom } = this.state;
    list.forEach(({ position, text }) =>{
      const t = new AMap.LabelMarker({ 
        position:[position.lng, position.lat], 
        text: {
          content: text,
          style: {
            fontSize: 10,
            fontWeight: 'normal',
            fillColor: '#ff2e00',
            strokeWidth: 1,
          }
        },
        zooms: [9, 20],
      });
      mapdom.add(t);
    })
  }

  // 3 跳转到防疫政策
  goNewPage = url =>{
    return url ? window.location.href = url: null;
  }

  // 4 添加 疫苗接种点
  addMark = () =>{
    const { mapdom, inoculation, addMarkflag } = this.state;
    inoculation.forEach(item => addMarkflag? mapdom.add(item): mapdom.remove(item))
    this.setState({ addMarkflag: !addMarkflag })
  }

  // 5 添加 核酸检测
  addMarkTest = () =>{
    const { mapdom, testingList, addTestflag } = this.state;
    testingList.forEach(item => addTestflag? mapdom.add(item): mapdom.remove(item))
    this.setState({ addTestflag: !addTestflag })
  }

  // 6 同归递归获取检测点
  getTesting = ({ page }) =>{
    const { testingList, addTestloading } = this.state;
    getCovidPointList({ type:2, page })
      .then(res => {
        if(res.data && res.data.length == 300) this.getTesting({ page: page+1 })
        else this.setState({ addTestloading:false })
        const _list = this.getMarkerIcon(res.data)
        this.setState({ testingList:[ ...testingList, ..._list ] })
      })
  }
  // 7 处理返回数据函数  返回new Marker数组
  getMarkerIcon = (data) => {
    return data.map(item=>{
      const { icon, position } = item.mapMarker;
      const { lng, lat } = position;
      const _icon = new AMap.Icon({
        imageSize: new AMap.Size(18, 18), 
        image: icon,
      });
     return new AMap.Marker({ icon: _icon, position:[lng, lat] })
    })
  }

  render() {
    const { 
      greenArr, yellowArr, redArr, CovidPrompt, 
      addMarkflag, addTestflag, addMarkloading, addTestloading
    } = this.state;
    const opc = { opacity: CovidPrompt.url?1:0 }
    return (<div className={style.map_wrapper}>
      {/* flex */}
      <div className={style.banner_text} style={opc}>
        {/* 数据展示 */}
        <div>
          <div className={style.banner_word1}>
            <span>封控区</span>
            <span>管控区</span>
            <span>防范区</span>
          </div>
          <div className={style.banner_word2}>
            <span>{redArr.length}个</span>
            <span>{yellowArr.length}个</span>
            <span>{greenArr.length}个</span>
          </div>
        </div>
        {/* 疫苗接种和核酸检测 */}
        <div className={style.banner_areabtn}>
          {/* 按钮上 */}
          <Spin spinning={addMarkloading}>
            <Button type="primary" ghost={addMarkflag} 
              size='small' shape="round" onClick={this.addMark} 
            >
              疫苗接种
            </Button>
          </Spin>
          {/* 按钮下 */}
          <Spin spinning={addTestloading}>
            <Button type="primary" ghost={addTestflag}
              size='small' shape="round" onClick={this.addMarkTest}
            >
              核酸检测
            </Button>
          </Spin>
        </div>
      </div>
      <div className={style.banner_textscroll} style={opc}>
        <div>{CovidPrompt.prompt}</div>
      </div>
      {/* 各地防疫政策 */}
      <img 
        onClick={()=> this.goNewPage(CovidPrompt.url)} style={opc}
        className={style.banner_image} src={CovidPrompt.icon} alt=''
      />
      {/* map-content */}
      <div id="container" className={style.wrapper}>
        <div className={`animate__animated animate__flash ${style.whitecontent}`}>
          <div className={style.whitetext}>地图加载中...</div>
        </div>
      </div>
    </div>)
  }
}

export default AMappage;