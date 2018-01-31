import React,{Component} from 'react'
import Foot from '../footer/footer';
import {Link} from 'react-router'
import axios from 'axios'
import qs from 'qs'

class Category extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			classList:[]
		}
		this.page=1
	}
	
	getDataUp(page){
		axios.post('/dola/app/game/newgetclasslist',qs.stringify({page})).then((res)=>{
			
			this.setState({
				
				classList:res.data.data.classList
			})
			
		}).catch((err)=>{
			
			console.log(err,'请求错误')
			
		})
	}
	
	loadMore(page){
		axios.post('/dola/app/game/newgetclasslist',qs.stringify({page})).then((res)=>{
			
			if(res.data.data.classList.length){
				this.setState({
				
					classList:res.data.data.classList
				})
			}else{
				alert('数据加载完毕了')
			}
			
			
			
		}).catch((err)=>{
			
			console.log(err,'请求错误')
			
		})
	}
	
	componentWillMount(){
		
		this.getDataUp(this.page)
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
		let {classList} = this.state
		console.log(this.state,'render')
		return (
			
			<div className='category-container main-box' ref='bodyBox'>
				<div className='com-box'>
					<header>
						<div className='left'></div>
						<div className='title'>分类</div>
						<div className='right'>
						</div>
					</header>
					<div className='category-content'>
						{
							classList.map(item=>(
								<Link to={{pathname:'/list/'+item.id,query:{name:item.name}}} key={item.id}>
									<div className='class-item'>
										<div className='item'>
											<div className='item-info'>
												<img src={item.image} alt={item.name}/>
												<span>{item.name}</span>
											</div>
											<i className='fa fa-angle-right'></i>
										</div>
									</div>
								</Link>
							))
						}
						
					</div>
					<Foot path='/category'/>
				</div>
			</div>
		);
	}
}

export default Category
