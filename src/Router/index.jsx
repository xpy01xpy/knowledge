/*
 * @Author: xpy
 * @Description: 路由配置
 * @Date: 2022-04-27 11:27:15
 * @LastEditTime: 2022-05-11 15:29:30
 */
import { HashRouter, Routes, Route, } from "react-router-dom";
import routerList from './router-list'; // 获取路由列表
import Hello from '../pages/Hello'; // 定义欢迎页面
import Layout from '../Layout'; // 定义页面排版布局

import NotFound from '../Layout/NotFound'; // 404 页面
// 路由方法需要用到递归来展示子路由
const Router = () =>{
  // 1 递归获取路由
  const getRoute = (list) => list.map((item,index) => {
    const { path, element, children, } = item;
    return <Route 
              key={`${index}-${path}`} 
              path={path} 
              element={element}
            >
              {children? getRoute(children): null}
            </Route>
  })
  
  return (<HashRouter>
    <Routes>
      {/* 通过类似递归的方式 最终要得到以下格式的路由信息 */}
      {/* 渲染子路由 demo 演示：https://reactrouter.com/ */}
      {/* 子路由需要 在 Layout 中使用 <Outlet /> 组件  */}
      {/* <Route path="/" element={<Layout />}>
        <Route path="/about" element={<About />}> 
          <Route path="about2" element={<About2 />}> 
          </Route>
        </Route>
      </Route> */}
      <Route path="/" element={<Layout />}>
        {/* 这里 index 属性是默认路由， 默认指向第一个路由 */}
        <Route index element={<Hello />} />
        {getRoute(routerList)}
      </Route>

      {/* 当没有其他路由与 URL 匹配时，您可以使用path="*". 此路由将匹配任何 URL，但具有最弱的优先级，因此路由器仅在没有其他路由匹配时才会选择它。 */}
      {/* https://reactrouter.com/docs/en/v6/getting-started/overview */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>)
}

export default Router;