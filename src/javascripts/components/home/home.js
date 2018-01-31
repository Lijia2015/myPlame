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
		super(props)
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
					window.onscroll = ''
					alert('数据加载完毕了')
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
		
		let that = this;
		window.onscroll = function(){
			let sc = window.scrollY;
			let h = window.screen.height;
			let scH = that.refs.bodyBox.scrollHeight;
			if(sc+h === scH){
				
				that.page++
				
				that.loadData(that.page)
			}
			
		}
		
	}
	
	componentDidMount(){
		
		this.handler.bind(this)()		
	}
	
	componentWillUnmount(){
		
		window.onscroll = ''
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
