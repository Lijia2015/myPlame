import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
class Foot extends Component{
	
	constructor(props){
		super(props)
		this.state ={
			navs:[
				{id:1,name:'首页',icon:'home',path:'/home'},
				{id:2,name:'榜单',icon:'trophy',path:'/trophy'},
				{id:3,name:'分类',icon:'bars',path:'/category'},
				{id:4,name:'我的',icon:'user-o',path:'/mine'}
			]
		}
	}
	
	render(){
		let {navs} = this.state;
		return (
			<div className='foot-content'>
				{
					navs.map((item)=>(
						<Link to={item.path} className={item.path===this.props.path?'curF':''} key={item.id}>
							<i className={`fa fa-${item.icon}`}></i>
							<span>{item.name}</span>
						</Link>
					))
				}
			</div>
		)
	}
}

//将redux中store的state传递到组件的props上
let mapStateToProps = (state)=>{
	
	return state
}

export default connect(mapStateToProps)(Foot)
