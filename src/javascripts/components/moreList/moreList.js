import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import qs from 'qs'
class MoreList extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			gameList:[],
			isLoadMore:true
		}
		this.page=1
	}
	goBack(){
		this.props.history.goBack()
	}
	
	getDataUp(id){
		axios.post('/dola/app/game/newgetthemegamelist',qs.stringify({
			page:this.page,
			type:1,
			themeId:id
		})).then((res)=>{
			console.log(res)
			
			if(this.page>1){
				if(res.data.data.gameList.length){
					this.setState({
						gameList:this.state.gameList.concat(res.data.data.gameList)
					})
				}else{
					
					this.setState({
						isLoadMore:false
					})
				}
				
			}else{
				
				this.setState({
					gameList:res.data.data.gameList
				})
			}
		}).catch((err)=>{
			console.log(err,'数据请求出错了')
		})
	}
	
	componentWillMount(){
		
		this.getDataUp(this.props.params.id)
	}
	
	handler(){
		this.page++
		this.getDataUp(this.props.routeParams.id)	
	}
	
	render(){
		
		let {gameList} = this.state
		return (
			
			<div className='more-container com-box' ref='bodyBox'>
				<header>
					<div className='left' onClick={this.goBack.bind(this)}>
						<i className='fa fa-angle-left'></i>
					</div>
						<div className='title'>{this.props.location.query.name}</div>
						<div className='right'>
					</div>
				</header>
				<div className='list-content clearfix'>
					{
						gameList.map(item=>(
							<div className='list-item' key={item.id}>
								<Link to={'/detail/'+item.id}>
									<div className='item-info'>
										<img src={item.image} alt={item.name}/>
										<div className='intro'>
											<span className='name'>{item.name}</span>
											<span className='sign' style={{background:item.labelList[0].color}}>{item.labelList[0].name}</span>
											<span className='desc'>{item.description}</span>
										</div>
									</div>
								</Link>
								<button >
									<Link to={{pathname:'/game/'+item.id,query:{name:item.name}}} style={{color:'#f33'}}>开始</Link>
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

export default MoreList
