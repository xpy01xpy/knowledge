/*
 * @Author: xpy
 * @Description: Css主页面
 * @Date: 2022-04-28 15:22:59
 * @LastEditTime: 2022-05-13 11:57:48
 */
import { Outlet, useLocation } from "react-router-dom";
import { useMemo, } from 'react'

const Css = () =>{
  const location = useLocation();

  const title = useMemo(() => {
    const { search, } = location;
    return search ? " / " + decodeURI(search.split("=")[1]) : null;
  }, [location.pathname])

  return <div>
    <div>Css{title}</div>
    <Outlet />
  </div>
}

export default Css