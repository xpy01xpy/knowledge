/*
 * @Date: 2022-06-15 09:36:57
 * @LastEditors: XPy
 * @LastEditTime: 2022-06-16 14:58:29
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
    if(params.loading) start(params)
  },[params])

  const start = (params) =>{
    getList(params).then(res=>{
      setData(res)
      setParams(par =>({ ...par, loading: false }))
    })
  }

  return ([ data, params, setParams ])
}

export default useTableDate;