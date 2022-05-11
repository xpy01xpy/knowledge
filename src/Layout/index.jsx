/*
 * @Author: xpy
 * @Description: 页面大布局
 * @Date: 2022-04-27 16:58:33
 * @LastEditTime: 2022-05-06 15:50:02
 */
import { Outlet } from "react-router-dom";
import Header from './Header';
import Nav from './Nav';
import './index.css'

function Layout() {
  return (
    <div className='App-wrapper'>
      {/* 标题 */}
      <header className='App-header'>
        <Header />
      </header>

      {/* 内容部分 */}
      <div className='App-content-wrapper'>
        {/* 左侧导航 */}
        <Nav />
        
        {/* 右侧内容 */}
        <div className='App-content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
