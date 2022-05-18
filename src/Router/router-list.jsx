/*
 * @Author: xpy
 * @Description: 定义路由列表
 * @Date: 2022-04-27 17:13:51
 * @LastEditTime: 2022-05-13 11:33:06
 */
import Css from '../pages/Css'; 
import FlexBox from '../pages/Css/FlexBox'; 
import BFC from '../pages/Css/BFC'; 
import BoxMode from '../pages/Css/BoxMode'; 


import Html from '../pages/Html';
import Javascript from '../pages/Javascript';
import Es6 from '../pages/Es6';
import Frame from '../pages/Frame';
import Expand from '../pages/Expand'; // 6 项目拓展
import DailyTools from '../pages/DailyTools'; // 7 日常工具
import AMap from '../pages/AMap'; // 8 高德地图


export default [
  {
    path:'Css',
    text:'Css',
    element: <Css />,
    children: [
      { 
        path:'BoxMode', 
        text:'BoxMode',
        title:'css盒模型',
        element: <BoxMode />,
      },
      { 
        path:'FlexBox', 
        text:'FlexBox',
        title:'flex布局',
        element: <FlexBox />,
      },
      { 
        path:'BFC', 
        text:'BFC',
        title:'块级格式化上下文',
        element: <BFC />,
      },
    ]
  },
  {
    path:'Html',
    text:'Html',
    element: <Html />,
  },
  {
    path:'Javascript',
    text:'Javascript',
    element: <Javascript />,
  },
  {
    path:'Es6',
    text:'Es6',
    element: <Es6 />,
  },
  {
    path:'Frame',
    text:'框架',
    element: <Frame />,
  },
  {
    path:'Expand',
    text:'项目拓展',
    element: <Expand />,
  },
  {
    path:'DailyTools',
    text:'日常工具',
    element: <DailyTools />,
  },
  {
    path:'AMap',
    text:'高德地图',
    element: <AMap />,
  },
]