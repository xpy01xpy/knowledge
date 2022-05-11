/*
 * @Author: xpy
 * @Description: 404 页面
 * @Date: 2022-04-28 14:44:44
 * @LastEditTime: 2022-05-11 15:34:05
 */
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from 'antd';
 
const NotFound = () =>{
  const location = useLocation();
  const navigator = useNavigate();

  const goCss = () => {
    navigator('/Css')
  }

  return <div>
    
    <Button type="primary" onClick={goCss}>跳转到首页</Button>
  </div>
}

export default NotFound;