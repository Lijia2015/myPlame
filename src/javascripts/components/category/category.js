import React,{Component} from 'react'
import Foot from '../footer/footer';
import {Link} from 'react-router'
import axios from 'axios'
import qs from 'qs'

class Category extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			page:1,
			classList:[]
		}
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
	
	componentWillMount(){
		
		this.getDataUp(this.state.page)
	}
	
	render(){
		let {classList} = this.state
		console.log(this.state,'render')
		return (
			<div className='category-container main-box com-box'>
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
			
		);
	}
}

export default Category
