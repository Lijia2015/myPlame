import React,{Component} from 'react'
import Banner from './banner'
import ClassList from './classList'
import Theme from './theme'
import Foot from '../footer/footer';
import axios from 'axios'
import {connect} from 'react-redux'
import qs from 'qs'

class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			bannerList:[],
			classList:[],
			themeList:[],
			
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
			
			that.setState({
				
				bannerList:data.data.bannerList,
				classList:data.data.classList,
				themeList:data.data.themeList,
			})
			
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	
	loadMore(page){
		
		let that = this;
		
		axios.post('/dola/app/mainpage/newgetmainpagelist',qs.stringify({
			page
		}))
		.then(({data})=>{
			
			console.log(data)
			
			if(data.data.themeList.length){
				that.setState({
				
					themeList:that.state.themeList.concat(data.data.themeList)
				})
			}else{
				window.onscroll = ''
				alert('数据加载完毕了')
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
				
				that.loadMore(that.page)
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
		
		let {bannerList,themeList,classList} = this.state
		
		return (
			<div className='home-container main-box ' ref='bodyBox'>
				<div className='com-box clearfix'>
					<header>
						<div className='left'></div>
						<div className='title'>首页</div>
						<div className='right'>
							<i className='fa fa-search'></i>
						</div>
					</header>
					<Banner data={bannerList}/>
					<ClassList data={classList}/>
					<Theme data={themeList}/>
					<Foot path='/home'/>
				</div>
			</div>
			
		);
	}
}

export default connect((state)=>state)(Home)
