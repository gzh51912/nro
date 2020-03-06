import React, { Component } from 'react';
import '../css/Home.css';
import {Link } from 'react-router-dom';
import axios from 'axios'
export default class Home extends Component {
    state={
        zhutuurl:'',
        datas:[]
    }

    componentDidMount(){
        axios.get("https://www.nanshig.com/mobile/index.php?act=index").then((res)=>{
            if(res.data.code===200){
                this.setState({
                    zhutuurl:res.data.datas[0].adv_list.item[0].image,
                    datas:res.data.datas.slice(1,5)
                })
            }  
        })
    }

    render() {
        return (
            <div className="Home">
               <img src={this.state.zhutuurl} className="zhutu"/>
               <div className="nctouch-home-layout">
               {
                   this.state.datas.map((item,index)=>{
                       return (
                        <div className="nctouch-home-block" key={index}>
                            <p>{item.goods.title}</p>
                            <ul>
                            {
                                item.goods.item.map((ele,idx)=>{
                                    return (
                                            <li key={idx}>
                                                <Link to={"/detail/"+ ele.goods_id}>
                                                <img src={ele.goods_image}></img>
                                                <div className="goods-info">
                                                    <div className="goods-name">
                                                    {ele.goods_name}
                                                    </div>
                                                    
                                                </div>
                                                <div className="goods-price">
                                                    ￥
                                                    <em>{ele.goods_promotion_price}</em>
                                                </div>
                                                </Link>
                                            </li>

                                    )
                                })
                            }                            
                            </ul>
                        </div>
                       )
                   })
               }
               </div>

            </div>
        )
    }
}
