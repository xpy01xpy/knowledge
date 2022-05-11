
/*
 * @Author: xpy
 * @Description: Hello主页面
 * @Date: 2022-04-28 15:22:59
 * @LastEditTime: 2022-05-05 16:59:36
 */

import { useNavigate } from "react-router-dom"

const Hello = () =>{
  const navigate = useNavigate();
  
  return <div>
    <div>PC端</div>
    <div>移动端</div>
  </div>
}

export default Hello