import React, { Component } from 'react';
import '../css/Detail.css';
import {EnvironmentOutlined,BankOutlined } from '@ant-design/icons';
import { Link} from 'react-router-dom';
import axios from 'axios';
import {MessageOutlined,ShoppingCartOutlined  } from '@ant-design/icons';
import Valuebox from './Valuebox';
// import { withRouter } from 'react-router-dom';
export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            display:false,
            goodsid:"",
            goods_name:"",
            goods_title:"",
            goods_spec:["",""],
            buy_num:1,
            buy_color:"",
            buy_size:"",
            goods_image:"",
            goods_info:"",
            shopname:"",
            spec_image:"",
            spec_value_color:[],
            spec_value_size:[],
            goods_evaluate_info:[],
            store_credit:[],
            goods_commend_list:[],
            mask:false
        }

    }

    getdata=()=>{
        let goodsid=this.props.match.params.goodsid;
        if(this.state.goodsid!==goodsid){
            this.setState({
                goodsid:goodsid,
                display:true,
            })
            axios.get("https://www.nanshig.com/mobile/index.php?act=goods&op=goods_detail&goods_id=" + goodsid +"&key=").then((res)=>{
            if(!res.data.datas.error){
                
                // console.log(Object.keys(res.data.datas.goods_info.spec_value).map(key=>res.data.datas.goods_info.spec_value[key])[0]);
                // console.log(Object.keys(res.data.datas.goods_info.spec_value).map(key=>res.data.datas.goods_info.spec_value[key])[1]);
                // console.log(Object.keys(Object.keys(res.data.datas.goods_info.spec_value).map(key=>res.data.datas.goods_info.spec_value[key])[1]).map(key=>Object.keys(res.data.datas.goods_info.spec_value).map(key=>res.data.datas.goods_info.spec_value[key])[1][key]));            
                    this.setState({
                        goods_title:res.data.datas.goods_info.goods_name,
                        goods_name:res.data.datas.goods_info.goods_name.split(" ")[0],
                        buy_color:res.data.datas.goods_info.goods_name.split(" ")[1],
                        buy_size:res.data.datas.goods_info.goods_name.split(" ")[2],
                        goods_price:res.data.datas.goods_info.goods_price,
                        goods_spec:Object.keys(res.data.datas.goods_info.goods_spec).map(key=>res.data.datas.goods_info.goods_spec[key]),
                        spec_value_color:Object.keys(Object.keys(res.data.datas.goods_info.spec_value).map(key=>res.data.datas.goods_info.spec_value[key])[0]).map(key=>Object.keys(res.data.datas.goods_info.spec_value).map(key=>res.data.datas.goods_info.spec_value[key])[0][key]),
                        spec_value_size:Object.keys(Object.keys(res.data.datas.goods_info.spec_value).map(key=>res.data.datas.goods_info.spec_value[key])[1]).map(key=>Object.keys(res.data.datas.goods_info.spec_value).map(key=>res.data.datas.goods_info.spec_value[key])[1][key]),
                        spec_image:Object.keys(res.data.datas.spec_image).map(key=>res.data.datas.spec_image[key])[0],
                        spec_images:Object.keys(res.data.datas.spec_image).map(key=>res.data.datas.spec_image[key]),
                        goods_image:res.data.datas.goods_image,
                        goods_info:res.data.datas.goods_info,
                        shopname:res.data.datas.store_info.store_name,
                        goods_evaluate_info:res.data.datas.goods_evaluate_info,
                        store_credit:Object.keys(res.data.datas.store_info.store_credit).map(key=>res.data.datas.store_info.store_credit[key]),
                        goods_commend_list:res.data.datas.goods_commend_list,
                    })
                    // this.changeColor();
                    // this.changeSize(); 
            } else{
                this.setState({
                    goodsid:goodsid,
                    display:false
                })
                    window.location="/notfound";
                }
            })

        }     
    }
    componentDidMount(){
        this.getdata();
    }
    componentDidUpdate(){
        this.getdata();
    }
    changeName=(buy_color,buy_size)=>{
        let {goods_name}=this.state;
        let goods_title=goods_name +" "+ buy_color + " " + buy_size;
        this.setState({
            goods_title:goods_title
        })
    }
    changeColor=(item,index)=>{        
        let {buy_color,buy_size,spec_images,spec_value_color}=this.state;
        if(buy_color!==item){
            this.changeName(item,buy_size);
            this.setState({
                buy_color:spec_value_color[index],
                spec_image:spec_images[index]
            })
        }
    }
    changeSize=(item,index)=>{
        let {buy_color,spec_value_size}=this.state;
        if(buy_color!==item){
            this.changeName(buy_color,item);
            this.setState({
                buy_size:spec_value_size[index],
            })
        }
    }
    closeMask=()=>{
        let {mask}=this.state;
        this.setState({
            mask:!mask
        })
    }
    goBack(){
        window.history.go(-1)
    }
    render() {
        // console.log(this.state.spec_value_color);
        
        let {goods_title,spec_image,spec_value_color,spec_value_size,buy_color,buy_size,buy_num,goods_price,
            mask,display,goods_info,shopname,store_credit,goods_image,goods_evaluate_info,goods_commend_list}=this.state; 
        // console.log(buy_color,buy_size);
        
        if(display===true){
            return (
                <div className="Detail">
                    <div className="header-l">
                        <a onClick={this.goBack}> {"<"} </a>
                    </div>
                    <div className="mask" style={{display:mask===false?"none":"block"}} onClick={this.closeMask}>
                        <div className="nctouch-bottom-mask-block" onClick={(e)=>{e.stopPropagation()}}>
                            <div className="nctouch-bottom-mask-top">
                                <div className="goods-pic">
                                    <img src={spec_image}></img>
                                </div>
                                <div className="mask-top-right">
                                    <p>{goods_title}</p>
                                    <div className="goods-price">
                                        ￥<em>{goods_price}</em>
                                    </div>
                                </div>
                            </div>
                            <div className="goods-options-stock">
                                <dl className="spec">
                                    <dt>颜色:</dt>
                                    {spec_value_color.map((item,index)=>{
                                        return <dd key={index} onClick={this.changeColor.bind(this,item,index)} className={buy_color===item?"current":""}>{item}</dd>
                                    })}
                                    {/* <dd className="current">黑色</dd>
                                    <dd>蓝色</dd> */}
                                </dl>
                                <dl className="spec">
                                    <dt>尺码:</dt>
                                    {spec_value_size.map((item,index)=>{
                                        return <dd key={index} onClick={this.changeSize.bind(this,item,index)} className={buy_size===item?"current":""}>{item}</dd>
                                    })}                                
                                </dl>
                            </div>
                            <div className="goods-option-value">
                                购买数量
                                {/* <div className="value-box fr">
                                    <span onClick={this.change.bind(this,-1)}><button>-</button></span>
                                    <span className="buy-num">{buy_num}</span>
                                    <span onClick={this.change.bind(this,1)}><button>+</button></span>
                                </div> */}
                                <Valuebox nums={buy_num}/>
                            </div>
                        </div>
                    </div>
                    <div className="goods-detail-top">
                        
                        <img className="goods-detail-pic" src={goods_image}></img>
                    </div>
                    <div className="goods-detail-cnt">
                        <div className="goods-detail-name">
                            <p>{goods_title}</p>
                        </div>
                        <div className="goods-detail-price">
                            <span className="price fl">￥<em>{goods_price}</em></span>
                            <span className="sold fr">销量:{goods_info.goods_salenum}件 </span>
                        </div>
                        <div className="goods-detail-item">
                            <div className="itme-name1 fl">送至</div>
                            <div className="itme-name2 fl">全国</div>
                            <div className="itme-name3 fl">有货</div>
                            <EnvironmentOutlined className="fr" style={{ fontSize: '12px', color: '#888' }}/>
                            <div className="itme-name4 fl">免运费</div>
                        </div>
                        <div className="select">
                            <div className="selected">已选</div>
                            <div className="choice" onClick={this.closeMask}>颜色<em>{buy_color}</em></div>
                            <div className="choice" onClick={this.closeMask}>尺码<em>{buy_size}</em></div>
                            <div className="rightoutlined fr">></div>
                        </div>
                        <div className="goods-detail-comment">
                            <div className="title">
                                <span className="fl">商品评价</span>
                                <span className="good-reputation fl">好评率<em>{goods_evaluate_info.good_percent}%</em></span>
                                <div className="rightoutlined fr">></div>
                                <span className="evaluate fr">({goods_evaluate_info.normal_percent}人评价)</span>
                            </div>
                        </div>
                        <div className="goods-detail-store">
                            <div className="store-name">
                                <BankOutlined style={{color:'#888'}}/>
                                <em>{shopname}</em>
                                <div className="rightoutlined fr">></div>
                            </div>
                            <div className="store-rate">
                                {store_credit.map((item,index)=>{
                                    return (
                                    <div key={index}>{item.text}<em>{item.credit}</em></div>
                                        )
                                })}
                            </div>
                        </div>
                        <div className="goods-detail-recom">
                            <h4>店铺推荐</h4>
                            <ul>
                                {goods_commend_list.map((item,index)=>{
                                    return (
                                        <li key={index}>
                                        <Link to={item.goods_id}>
                                            <img className="pic" src={item.goods_image_url}></img>
                                            <p>{item.goods_name}</p>
                                            <span>￥<em>{item.goods_promotion_price}</em></span>
                                        </Link>
                                    </li>                                )
                                })}
    
                            </ul>
                        </div>
                    </div>
                    <div className="goods-detail-bottom">点击查询商品详情</div>
                    <div className="goods-detail-foot">
                        <div className="otreh-handle fl">
                            <Link to="/chat" className="kefu"><MessageOutlined style={{fontSize:'14px'}}/><p>客服</p></Link>
                            <Link to="/cart" className="cart"><ShoppingCartOutlined style={{fontSize:'14px'}}/><p>购物车</p></Link>
                        </div>
                        <div className="buy-handle fr">
                            <a className="buy-now fl">立即购买</a>
                            <a className="add-cart fr">加入购物车</a>
                        </div>
                    </div>
                </div>
            )        
        }else{
            return <div></div>
        }

    }
}
// class Detail extends Component {
//     state={
//         play:false,
//         goodsid:"",
//         num:1,
//         goods_image:"",
//         goods_info:"",
//         shopname:"",
//         goods_evaluate_info:[],
//         store_credit:[],
//         goods_commend_list:[]
//     }
//     getdata(){
//         let goodsid=this.props.match.params.goodsid; 
//         if(this.state.goodsid!==goodsid){
//             this.setState({
//                 goodsid:goodsid,
//                 // play:true
//             })
//             axios.get("https://www.nanshig.com/mobile/index.php?act=goods&op=goods_detail&goods_id=" + goodsid +"&key=").then((res)=>{
//             if(!res.data.datas.error){
//                     this.setState({
//                         goods_image:res.data.datas.goods_image,
//                         goods_info:res.data.datas.goods_info,
//                         shopname:res.data.datas.store_info.store_name,
//                         goods_evaluate_info:res.data.datas.goods_evaluate_info,
//                         store_credit:Object.keys(res.data.datas.store_info.store_credit).map(key=>res.data.datas.store_info.store_credit[key]),
//                         goods_commend_list:res.data.datas.goods_commend_list,
//                     })
//             } else{
//                 this.setState({
//                     goodsid:goodsid,
//                     // play:false
//                 })
//                     window.location="/notfound";
//                 }
//             })
                
//         }     
//     }
//     componentDidMount(){
//         this.getdata()
//     }
//     componentDidUpdate(){
//         this.getdata()
//     }  
//     render() {
//         let {goods_info,shopname,store_credit,goods_image,goods_evaluate_info,goods_commend_list}=this.state;        
//         return (
//             <div className="Detail">
//                 <div className="goods-detail-top">
//                     <img className="goods-detail-pic" src={goods_image}></img>
//                 </div>
//                 <div className="goods-detail-cnt">
//                     <div className="goods-detail-name">
//                         <p>{goods_info.goods_name}</p>
//                     </div>
//                     <div className="goods-detail-price">
//                         <span className="price fl">￥<em>{goods_info.goods_price}</em></span>
//                         <span className="sold fr">销量:{goods_info.goods_salenum}件 </span>
//                     </div>
//                     <div className="goods-detail-item">
//                         <div className="itme-name1 fl">送至</div>
//                         <div className="itme-name2 fl">全国</div>
//                         <div className="itme-name3 fl">有货</div>
//                         <EnvironmentOutlined className="fr"style={{ fontSize: '12px', color: '#888' }}/>
//                         <div className="itme-name4 fl">免运费</div>
//                     </div>
//                     <div className="select">
//                         <div className="selected">已选</div>
//                         <div className="choice">颜色<em>灰色</em></div>
//                         <div className="choice">尺码<em>M</em></div>
//                         <div className="rightoutlined fr">></div>
//                     </div>
//                     <div className="goods-detail-comment">
//                         <div className="title">
//                             <span className="fl">商品评价</span>
//                             <span className="good-reputation fl">好评率<em>{goods_evaluate_info.good_percent}%</em></span>
//                             <div className="rightoutlined fr">></div>
//                             <span className="evaluate fr">({goods_evaluate_info.normal_percent}人评价)</span>
//                         </div>
//                     </div>
//                     <div className="goods-detail-store">
//                         <div className="store-name">
//                             <BankOutlined style={{color:'#888'}}/>
//                             <em>{shopname}</em>
//                             <div className="rightoutlined fr">></div>
//                         </div>
//                         <div className="store-rate">
//                             {store_credit.map((item,index)=>{
//                                 return (
//                                 <div key={index}>{item.text}<em>{item.credit}</em></div>
//                                     )
//                             })}
//                         </div>
//                     </div>
//                     <div className="goods-detail-recom">
//                         <h4>店铺推荐</h4>
//                         <ul>
//                             {goods_commend_list.map((item,index)=>{
//                                 return (
//                                     <li key={index}>
//                                     <Link to={item.goods_id}>
//                                         <img className="pic" src={item.goods_image_url}></img>
//                                         <p>{item.goods_name}</p>
//                                         <span>￥<em>{item.goods_promotion_price}</em></span>
//                                     </Link>
//                                 </li>                                )
//                             })}

//                         </ul>
//                     </div>
//                 </div>
//                 <div className="goods-detail-bottom">点击查询商品详情</div>
//                 <div className="goods-detail-foot">
//                     <div className="otreh-handle fl">
//                         <Link to="/chat" className="kefu"><MessageOutlined style={{fontSize:'14px'}}/><p>客服</p></Link>
//                         <Link to="/cart" className="cart"><ShoppingCartOutlined style={{fontSize:'14px'}}/><p>购物车</p></Link>
//                     </div>
//                     <div className="buy-handle fr">
//                         <a className="buy-now fl">立即购买</a>
//                         <a className="add-cart fr">加入购物车</a>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }


// export default withRouter(Detail);