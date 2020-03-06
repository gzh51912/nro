import React, { Component } from 'react';
import '../css/Valuebox.css';

export default class Valuebox extends Component {
    constructor(props){
        super(props);
        this.state={
            nums:this.props.nums
        }
    }
    change(num){
        let {nums}=this.state;
        nums+=num;        
        if(nums< 1){
            this.setState({
                nums:1
            })
        }else{
            this.setState({
                nums:nums
            })
        }
    }
    render() {
        let {nums}=this.state;        
        return (
            <div className="valuebox">
                 <span onClick={this.change.bind(this,-1)}><button>-</button></span>
                 <span className="buy-num">{nums}</span>
                 <span onClick={this.change.bind(this,1)}><button>+</button></span>
            </div>
        )
    }
}
