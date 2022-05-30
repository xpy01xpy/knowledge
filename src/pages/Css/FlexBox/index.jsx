/*
 * @Author: xpy
 * @Description: FlexBox主页面
 * @Date: 2022-04-28 15:22:59
 * @LastEditTime: 2022-05-19 20:55:46
 */
import { Row, Col, Collapse } from 'antd';
import { useState } from 'react';
import style from './style.module.css';

const { Panel } = Collapse;

const FlexBox = () =>{
  const [defaultkey,setDefaultkey] = useState(['1'])

  return <div className={style.wrappersty}>
    <div></div>
    <Collapse 
      bordered={false} // 隐藏边框
      defaultActiveKey={defaultkey} 
      onChange={(e)=> setDefaultkey(e)}
      ghost
    >
      <Panel header="一、Flex 布局是什么？" key="1">
        <div>Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。</div>
        <div>任何一个容器都可以指定为 Flex 布局。</div>
        <code>
        {`.box{
          display: flex;
        }`}
        </code>
        <div>行内元素也可以使用 Flex 布局。</div>
        <code>
        {`.box{
            display: inline-flex;
          }`}
        </code>
        <div>Webkit 内核的浏览器，必须加上-webkit前缀。</div>
        <code>
        {`.box{
          display: -webkit-flex; /* Safari */
          display: flex;
        }`}
        </code>
        <div>注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。</div> 
      </Panel>
      <Panel header="二、基本概念" key="2">
        <div>采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。</div>
        <div>容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。</div>
        <div>项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。</div>
      </Panel>
      <Panel header="三、容器的属性" key="3">
        <Row gutter={[16, 8]} className={style.topbg}>
          <Col xs={24} sm={12}>1</Col>
          <Col xs={24} sm={12}>2</Col>
        </Row>
      </Panel>
    </Collapse>
  </div>
}

export default FlexBox