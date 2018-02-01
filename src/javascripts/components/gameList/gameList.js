import React,{Component} from 'react'
import axios from 'axios'
import qs from 'qs'
import {Link} from 'react-router'
class GameList extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			navs:[
				{title:'最热',id:1},
				{title:'最新',id:2}
			],
			gameList:[],
			type:1,
			isLoadMore:true
		}
		this.page = 1
	}
	
	goBack(){
		
		this.props.history.goBack()
	}
	
	changeShow(type){
		this.setState({
			type,
			gameList:[],
			isLoadMore:true
		})
		this.page = 1
		setTimeout(()=>{
			this.getDataUp(this.props.routeParams.id)
		},0)
	}
	
	getDataUp(classId){
		let that = this
		axios.post('/dola/app/game/newgetgamelist',qs.stringify({
			type:that.state.type,
			page:that.page,
			classId
		})).then((res)=>{
			
			if(this.page > 1){
				
				if(res.data.data.gameList.length){
					that.setState({
						gameList:that.state.gameList.concat(res.data.data.gameList)
					})
				}else{
					
					this.setState({
						isLoadMore:false
					})
				}
			}else{
				that.setState({
					gameList:res.data.data.gameList
				})
			}
		}).catch((err)=>{
			console.log(err,'数据请求错啦')
		})
	}
	
	componentWillMount(){
		this.getDataUp(this.props.routeParams.id)
	}
	
	handler(){
		this.page++		
		this.getDataUp(this.props.routeParams.id)
	}
	
	render(){
		console.log(this)
		let {gameList} = this.state
		
		return(
			<div className='list-container com-box' ref='bodyBox'>
				<header>
					<div className='left' onClick={this.goBack.bind(this)}>
						<i className='fa fa-angle-left'></i>
					</div>
						<div className='title'>{this.props.location.query.name}</div>
						<div className='right'>
					</div>
				</header>
				
				<div className='nav-bar'>
					{
						this.state.navs.map(item=>(
							<div key={item.id} className='nav' onClick={()=>this.changeShow(item.id)}>
								<span className={this.state.type===item.id?'curN':''}>
									{item.title}
								</span>
							</div>
						))
					}
				</div>
				
				<div className='list-content clearfix'>
					{
						gameList.map(item=>(
							<div className='list-item' key={item.id}>
								<Link to={'/detail/'+item.id}>
									<div className='item-info'>
										<img src={item.image} alt={item.name}/>
										<div className='intro'>
											<span className='name'>{item.name}</span>
											<span className='count'>{item.playCount}正在玩</span>
											<span className='desc'>{item.description}</span>
										</div>
									</div>
								</Link>
								<button >
									<Link to={{pathname:'/game/'+item.id,query:{name:item.name}}} style={{color:'#ff2741'}}>开始</Link>
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
			</div>
		)
	}
}

export default GameList
