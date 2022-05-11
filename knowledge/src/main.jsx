/*
 * @Author: xpy
 * @Description: 入口文件
 * @Date: 2022-04-26 22:58:01
 * @LastEditTime: 2022-05-05 17:37:10
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'; // 定义路由
import './global.css'; // 全局样式
import 'antd/dist/antd.css'; // 全局引入antd样式

// React.StrictMode 注意：严格模式检查仅在开发模式下运行；它们不会影响生产构建。 
// 官网地址：https://zh-hans.reactjs.org/docs/strict-mode.html#gatsby-focus-wrapper
// 1、识别不安全的生命周期
// 2、关于使用过时字符串 ref API 的警告
// 3、关于使用废弃的 findDOMNode 方法的警告
// 4、检测意外的副作用
// 5、检测过时的 context API

// React在严格模式下会执行【两次render】以帮忙检查额外的副作用。
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 使用路由组件包裹组件 */}
    <Router />
  </React.StrictMode>
)
