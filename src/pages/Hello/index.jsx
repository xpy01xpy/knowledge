
/*
 * @Author: xpy
 * @Description: Hello主页面
 * @Date: 2022-04-28 15:22:59
 * @LastEditTime: 2022-06-15 10:48:43
 */

import { useNavigate } from "react-router-dom";
import useTableDate from './useTableDate'

const Hello = () =>{
  const navigate = useNavigate();
  const [ data, params, setParams ] = useTableDate();
  console.log('父组件得到的 { data, setParams}', { data, params, setParams})
  
  return <div>
    <div>PC端</div>
    <div onClick={()=>{
      setParams(par =>({ ...par, pageNum: par.pageNum + 1, loading: !par.loading }))
    }}>增加size</div>

    <div>data: {JSON.stringify(data)}</div>
    <div>params: {JSON.stringify(params)}</div>
    
    <div>移动端</div>
  </div>
}

export default Hello