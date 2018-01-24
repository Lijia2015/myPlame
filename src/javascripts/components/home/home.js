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
		console.log(this,123142)
		this.state = {
			data:{
				bannerList:[],
				classList:[],
				themeList:[],
			},
			page:1
		}
	}
	loadData(page){
		
		let that = this;
		
		axios.post('/dola/app/mainpage/newgetmainpagelist',qs.stringify({
			page
		}))
		.then(({data})=>{
			
			that.setState({
				data:data.data
			})
			
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	componentWillMount(){
		
		this.loadData(this.state.page)
	}
	render(){
		let {data} = this.state
		return (
			<div className='home-container main-box clearfix'>
				<header>
					<div className='left'></div>
					<div className='title'>首页</div>
					<div className='right'>
						<i className='fa fa-search'></i>
					</div>
				</header>
				<Banner data={data.bannerList}/>
				<ClassList data={data.classList}/>
				<Theme data={data.themeList}/>
				<Foot path='/home'/>
			</div>
			
		);
	}
}

export default connect((state)=>state)(Home)
