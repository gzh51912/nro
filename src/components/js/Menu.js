import React, { Component } from 'react';
import '../css/Menu.css';
import { HomeOutlined,ShoppingCartOutlined,AppstoreOutlined,CommentOutlined,UserOutlined } from '@ant-design/icons';

import {Link } from 'react-router-dom';

export default class Menu extends Component {
    state={
        menu:[
            {
                icon:<HomeOutlined />,
                path:"/home",
                p:"首页"
            },
            {
                icon:<AppstoreOutlined />,
                path:"/classification",
                p:"分类"
            },
            {
                icon:<CommentOutlined />,
                path:"/chat",
                p:"聊天"
            },
            {
                icon:<ShoppingCartOutlined />,
                path:"/cart",
                p:"购物车"
            },
            {
                icon:<UserOutlined/>,
                path:"/mine",
                p:"我的"
            },
            
        ]
    }
    render() {
        return (
            <div className="Menu">
                <ul>
                    {
                        this.state.menu.map((item,index)=>{
                        return (
                            <li key={index}>
                                <Link to={item.path} >
                                    {item.icon}
                                    <p>{item.p}</p>
                                </Link></li>
                        )
                        })
                    }
                </ul>
            </div>
            
        )
    }
}
