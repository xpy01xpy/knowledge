/*
 * @Author: xpy
 * @Description: 头部导航
 * @Date: 2022-04-28 15:05:29
 * @LastEditTime: 2022-05-06 14:04:30
 */
import React, { PureComponent } from "react";
import { Button } from 'antd';
import routerlist from '../../Router/router-list';
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css"

class Header extends PureComponent {
  // 1 获取菜单按钮
  getNavdom = () =>{
    const { navigate, location, } = this.props.history;
    return routerlist.map(item=>{
      const { path, text, } = item;
      const _type = location.pathname.includes(item.path) ? 'primary' :'default';
      return <Button 
        type={_type}
        shape="round" 
        size="small"
        onClick={()=> navigate(path)}  //  2 跳转到对应的路由
        key={path}
        >
          {text}
        </Button>
    })
  }

  render() {
    const { navigate, } = this.props.history;
    return (<div className="header-list">
        <Button type="link" shape="round" size="default" onClick={()=>navigate('/')}>首页 </Button>
        {this.getNavdom()}
      </div>
    )
  }
}

// 类高阶组件 注入路由
const Headers = () =>{
  const navigate = useNavigate();
  const location = useLocation();
  return <Header history={{ navigate, location }}/>
}

export default Headers;