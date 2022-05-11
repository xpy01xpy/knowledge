import routerlist from '../../Router/router-list';
import { useMemo } from "react"
import QueueAnim from 'rc-queue-anim';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from 'antd';

const Nav = () =>{
  const location = useLocation();
  const navigator = useNavigate();

  const getNavdom = useMemo(()=>{
    const filterRoute = ['/', '/AMap'];
    if(filterRoute.includes(location.pathname)){
      return null
    } else {
      // 这里通过路由来判断的 左侧展示的二级路由列表 _routerPage
      const _routerPage = routerlist.filter(item => location.pathname.includes(item.path))[0];
      // 
      // 
      return <nav className='App-nav'> 
        {/* 依次进场动效 */}
        <QueueAnim
          duration={150}
          key={_routerPage.path + "nav-show-hide"} // ** 注意唯一 key 值，每次切换路由都需要渲染不同的 key 值。
          type={['right', 'left']} // 动画入场顺序 从右到左
          ease={['easeOutQuart', 'easeInOutQuart']}
        >
          { _routerPage.children && 
            _routerPage.children.map(item=> {
            return <div 
                  key={item.path}
                  type="link"
                  // 这里的跳转路径是父级路径 + 子集路径
                  onClick={()=> navigator(_routerPage.path + "/" + item.path)}
                >
                  <Button 
                    type={location.pathname.includes(item.path)?"primary":"text"} 
                    size="small" style={{ width:'100%', marginBottom:'2px' }}
                  >
                    {item.text}
                  </Button>
                </div>
              })
          }
        </QueueAnim>
      </nav>
    } 
  },[location.key]) 

  return getNavdom
}

export default Nav;