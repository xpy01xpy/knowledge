/*
 * @Date: 2022-06-15 09:36:57
 * @LastEditors: XPy
 * @LastEditTime: 2022-06-15 11:08:55
 * @FilePath: \knowledge\src\pages\Hello\useTableDate.jsx
 */
/*
 * @Date: 2022-06-15 09:36:57
 * @LastEditors: XPy
 * @LastEditTime: 2022-06-15 10:50:28
 * @FilePath: \knowledge\src\pages\Hello\useTableDate.jsx
 */
import { useEffect, useState } from "react";
import { getList, } from '../../utils/api';

const useTableDate = () =>{
  const [ data, setData] = useState({});
  const [ params, setParams] = useState({ pageNum: 1, pageSize: 10, loading: true });

  useEffect(()=>{
    console.log('子组件改变 params useEffect',params)
    start(params)
  },[params])

  const start = () =>{
    getList({}).then(res=>{
      setData(res)
    })
  }

  return ([ data, params, setParams ])
}

export default useTableDate;