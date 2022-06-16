
/*
 * @Author: xpy
 * @Description: Hello主页面
 * @Date: 2022-04-28 15:22:59
 * @LastEditTime: 2022-06-16 14:56:22
 */

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useTableDate from './useTableDate';
import { Button, Spin } from 'antd';

const Hello = () =>{
  const navigate = useNavigate();
  const [ data, params, setParams ] = useTableDate();

  const divList = useMemo(()=>{
    if(data && data.length) {
      return data.map(item=>{
        return <div key={JSON.stringify(item)}>{JSON.stringify(item)}</div>
      })
    } else {
      return  <div>123</div>
    }
  },[data]);
  
  return <div>
    <div>PC端</div>
    <Button onClick={()=>{
      setParams(par =>({ ...par, pageNum: par.pageNum + 1, loading: true }))
    }}>增加size</Button>
    params
    <Spin spinning={params.loading}>
      {divList}
    </Spin>
    <div>移动端</div>
  </div>
}

export default Hello