import React,{Component} from 'react'
import Foot from '../footer/footer';
import Header from './headerNav'
import {Link} from 'react-router'
import axios from 'axios'
import qs from 'qs'

class Trophy extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			navs:[
				{title:'总榜',type:1,id:1},
				{title:'新锐',type:2,id:2}
			],
			gameList:[],
			isShow : true,
			type:1,
			top:0,
			isLoadMore:true
		}
		this.page = 1
		this.changeShow = this.changeShow.bind(this)
	}
	
	changeShow(type){
		
		this.setState({
			type,
			isLoadMore:true,
			gameList:[]
		})
		this.page = 1
		this.loadData(type)
		
	}
	
	loadData(type){
		
		axios.post('/dola/app/game/newgetgameleaderboard',qs.stringify({
			page:this.page,
			type
		})).then(({data})=>{
			console.log(data)
			if(this.page > 1){
				
				if(data.data.gameList.length){
					this.setState({
						gameList:this.state.gameList.concat(data.data.gameList)
					})
				}else{
					
					this.setState({
						isLoadMore:false
					})
				}
				
			}else{
				
				this.setState({
					gameList:data.data.gameList
				})
			}
			
		}).catch((err)=>{
			console.log('数据请求错误'+err)
		})
		
	}
	
	componentWillMount(){
		this.loadData(this.state.type)
	}
	
	handler(){
		
		this.page++
				
		this.loadData(this.state.type)
	}
	

	render(){
		console.log(this,'数据更改了')
		return (
			<div className='home-container main-box ' ref='bodyBox'>
				<div className='com-box'>
					
					<Header context={'榜单'}/>
					<div className={this.state.top>150?'nav-bar fixed-bar':'nav-bar'}>
						{
							this.state.navs.map(item=>(
								<div key={item.id} className='nav' onClick={()=>this.changeShow(item.type)}>
									<span className={this.state.type===item.type?'curN':''}>
										{item.title}
									</span>
								</div>
							))
						}
					</div>
					<div className='home-content'>
						{
							this.state.gameList.map((item,i)=>(
								<div key={item.id} className='list-item'>
									<Link to={'/detail/'+item.id} className='item-content'>
										<span>{i+1}</span>
										<div className='imgEl'>
											<img src={item.image} alt={item.name}/>
										</div>
										<div className='list-info'>
											<span className='list-name'>{item.name}</span>
											<span className='list-sign' style={{background:item.labelList[0].color}}>{item.labelList[0].name}</span>
											<span className='list-desc'>{item.description}</span>
										</div>
									</Link>
									<button >
										<Link to={{pathname:'/game/'+item.id,query:{name:item.name}}}>开始</Link>
									</button>
								</div>
							))
						}
					</div>
					<div className='loadMore' onClick={this.state.isLoadMore?()=>this.handler():alert('数据已经加载完毕了')}>
						{
							this.state.isLoadMore?'点击加载更多':'数据加载完毕了'
						}
					</div>
					<Foot path='/trophy'/>
				</div>
			</div>
		);
	}
}

export default Trophy
