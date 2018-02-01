import React,{Component} from 'react'
import Banner from './banner'
import ClassList from './classList'
import Theme from './theme'
import Foot from '../footer/footer';
import axios from 'axios'
import qs from 'qs'

import {connect} from 'react-redux'
import homeLoad from '../../../redux/actionCreaters/Home_Load'
import loadMore from '../../../redux/actionCreaters/Home_loadMore'


class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoadMore:true
		}
		this.page = 1
	}
	loadData(page){
		
		let that = this;
		
		axios.post('/dola/app/mainpage/newgetmainpagelist',qs.stringify({
			page
		}))
		.then(({data})=>{
			
			console.log(data)
			if(page>1){
				
				if(data.data.themeList.length){
				
					this.props.loadMore(data.data.themeList)
					
				}else{
					
					this.setState({
						isLoadMore:false
					})
				}
				
			}else{
				
				that.props.homeLoad(data.data.bannerList,data.data.classList,data.data.themeList)
			}
			
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	
	componentWillMount(){
		
		this.loadData(this.page)
	}
	
	handler(){
		
		this.page++
				
		this.loadData(this.page)
	}
	
	render(){
		
		console.log(this.props)
		
		let {_bannerList,_themeList,_classList} = this.props
		
		return (
			<div className='home-container main-box' ref='bodyBox'>
				<div className='com-box clearfix'>
					<header>
						<div className='left'></div>
						<div className='title'>首页</div>
						<div className='right'>
							<i className='fa fa-search'></i>
						</div>
					</header>
					<Banner data={_bannerList}/>
					<ClassList data={_classList}/>
					<Theme data={_themeList}/>
					<div className='loadMore' onClick={this.state.isLoadMore?()=>this.handler():alert('数据已经加载完毕了')}>
						{
							this.state.isLoadMore?'点击加载更多':'数据加载完毕了'
						}
					</div>
					<Foot path='/home'/>
				</div>
			</div>
			
		);
	}
}

let mapStateToProps = (state) =>{
	return {
		_user:state.user,
		_bannerList:state.bannerList,
		_classList:state.classList,
		_themeList:state.themeList
	}
}

let mapDispatchToProps = (dispatch)=>{
	
	return {
		homeLoad:(bannerList,classList,themeList)=>{
			
			dispatch(homeLoad(bannerList,classList,themeList))
		},
		loadMore:(themeList)=>{
			
			dispatch(loadMore(themeList))
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
