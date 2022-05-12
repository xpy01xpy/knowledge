/*
 * @Author: xpy
 * @Description: 404 页面
 * @Date: 2022-04-28 14:44:44
 * @LastEditTime: 2022-05-12 15:19:07
 */
import { useNavigate } from "react-router-dom";
import { Result, Button } from 'antd';
import style from './style.module.css'


const NotFound = () =>{
  const navigator = useNavigate();

  const goCss = () => {
    navigator('/Css')
  }

  return <Result
    status="404" 
    title={<div className={`animate__animated animate__lightSpeedInRight ${style.text_shadow}`}>
        404 页面找不到啦
      </div>
    }
    subTitle={<div className={`animate__animated animate__tada animate__repeat-3 ${style.text_animaton}`}>
      这个页面还没开发哦，返回首页看其他的吧...
      </div>
    }
    extra={<Button 
        type="primary" onClick={goCss} size="large" shape="round"
        className={`animate__animated animate__lightSpeedInRight ${style.text_btn}`}
        >
          返回首页
        </Button>
    }
  />
}

export default NotFound;