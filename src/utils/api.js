import { request } from './request';


function getMapData(params){
  const { suffix='', method='post' } = params;
  // 地图资源地址前缀
  const mapurl = 'https://api.kaiba315.com.cn/activity/covid' + suffix;
  return request({ url:mapurl, method })
}
// 1 获取封控区全部地点
export function getCovidAreaList(){
  const suffix = '/getCovidAreaList';
  return getMapData({ suffix, })
}

// 2 获取更新时间 和 防疫政策链接
// 防疫政策链接：https://tai.qq.com/epidemic/index.html?from=hzjt8
export function getCovidPrompt(){
  const suffix = '/getCovidPrompt';
  return getMapData({ suffix, })
}

// 3 获取接种点和核酸检测点  
export function getCovidPointList(params){
  const { type=1, page=1, } = params;
  // type 1 接种点  2 核酸检测点
  const suffix = `/getCovidPointList?type=${type}&page=${page}&pageSize=300`;
  return getMapData({ suffix, })
}


export function getList(params){
  const { pageNum=1, pageSize=10, } = params;
  return new Promise((resolve) =>{
    const list = [];
    for(let i = 0; i < 20; i ++){
      list.push({ key: new Date().getTime(), name: '胡' + i, age: i, address: `西湖区湖底公园${i}号` })
    }
    setTimeout(()=> resolve(list), 1500)
  })
}