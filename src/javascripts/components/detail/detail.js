import React,{Component} from 'react'
import axios from 'axios'
import qs from 'qs'
import {connect} from 'react-redux'
import {hashHistory} from 'React-router'
import {Link} from 'react-router'


class Detail extends Component{
	constructor(props){
		super(props);
		this.state = {
			data:{},
			type:1,
			navs:[
				{title:'游戏简介',id:1},
				{title:'游戏礼包',id:2}
			],
			isFavourite:0
		}
	}
	
	goBack(){
		
		this.props.history.goBack()
	}
	changeShow(type){
		this.setState({
			type
		})
	}
	componentWillMount(){
		
		this.getDataUp(this.props.routeParams.id)
	}
	
	collectOrCancel(id){
		if(this.props.user){
			
			let params = {
				
				gid:id,
				uid:this.props.user.uid,
				token:this.props.user.token
			}
			
			if(this.state.isFavourite){
				
				axios.post('/dola/app/game/cancelfavourite',qs.stringify(params)).then((res)=>{
					
					if(res.data.status){
						
						this.setState({
							
							isFavourite:0
						})
						
					}else{
						console.log('取消收藏失败')
					}
					
				}).catch((err)=>{
					
					console.log(err,'取消收藏失败')
				})
				
			}else{
				
				axios.post('/dola/app/game/addfavourite',qs.stringify(params)).then((res)=>{
					
					if(res.data.status){
						
						this.setState({
							
							isFavourite:1
						})
						
					}else{
						console.log('收藏失败')
					}
					
				}).catch((err)=>{
					
					console.log(err,'收藏失败')
				})
				
			}
			
			
		}else{
			
			hashHistory.push('/login')
		}
		
	}
	
	getPresent(params){
		
		console.log(params)
		
		if(this.props.user){
			
			axios.post('/dola/app/game/newpickuppresent',qs.stringify(params)).then((res)=>{
				
				if(res.data.status){
					console.log(res,'礼包领取成功')
				}else{
					console.log('礼包领取失败')
				}
				
			}).catch((err)=>{
				
				console.log('礼包领取失败')
			})
			
			
		}else{
			
			hashHistory.push('/login')
			
		}
		
	}
	
	getDataUp(id){
		
		let params = this.props.user?{
			gid:id,
			uid:this.props.user.uid,
			token:this.props.user.token
		}:{
			gid:id
		}
		
		axios.post('/dola/app/game/newgetgamedetail',qs.stringify(params)).then((res)=>{
			let {data} = res.data
			this.setState({
				data,
				isFavourite:res.data.data.isFavourite
			})
			
		}).catch((err)=>{
			console.log(err,'数据请求错误')
		})
		
	}
	
	
	render(){
		console.log(this,'detail')
		
		let {data,isFavourite} = this.state
		let sign = data.labelList?data.labelList[0]:{}
		let imageList = data.imageList?data.imageList:[]
		let recommendList = data.recommendList?data.recommendList:[]
		let presentList = data.presentList?data.presentList:[]
		return(
			
			<div className='detail-container main-box'>
				<div className='com-box'>
					<header>
						<div className='left' onClick={this.goBack.bind(this)}>
							<i className='fa fa-angle-left'></i>
						</div>
						<div className='title'>{data.name}</div>
						<div className='right'>
						</div>
					</header>
					<div className='head-info'>
						<img src={data.icon} alt={data.name}/>
						<div className='intro'>
							<span className='name'>{data.name}</span>
							<span className='sign' style={{background:sign.color}}>{sign.name}</span>
							<span className='desc'>{data.description}</span>
						</div>
					</div>
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
					<div className={this.state.type===2?'hideEl':'game-intro'}>
						<div className='img-scro clearfix'>
							{
								imageList.map((item,index)=>(
									<img src={item} key={index} alt={item}/>
								))
							}
						</div>
						<div className='intro intro-content'>
							<h3>游戏简介</h3>
							<p>{data.guide}</p>
						</div>
						
					</div>
					<div className={this.state.type===1?'hideEl':'game-prensent'}>
						{
							presentList.length===0?<div className='emptyEL presentEL'>
								{'您好,暂时还没有礼包哦!'}
							</div>:<div className='presentEL'>
								{
									presentList.map(item=>(
										<div className='pre-item' key={item.id}>
											<div className='pre-info'>
												<span className='pre-count'>{item.name}</span>
												<span className='pre-content'>礼包内容 : {item.description}</span>
												<span className='pre-time'>有效时间 : {item.time}</span>
											</div>
											<button className={item.status?'':'ownBtn'} onClick={()=>this.getPresent({uid:this.props.user.uid,token:this.props.user.token,presentId:item.id})}>
												{item.status?'已领取':'领取'}
											</button>
										</div>
									))
								}
							</div>
						}
					</div>
					<div className='recommend intro-content'>
						<h3>相关游戏推荐</h3>
						<div className='rec-item'>
							{
								recommendList.map(item=>(
									<div className='item' key={item.id}>
										<img src={item.image} alt={item.name} />
										<span>{item.name}</span>
									</div>
								))
							}
						</div>
					</div>
				</div>
				<div className='action-footer'>
					<div className='b-left'>
						<div className={isFavourite?'isFa':''} onClick={()=>this.collectOrCancel(this.props.routeParams.id)}>
							<i className={isFavourite?'fa fa-heart':'fa fa-heart-o'}></i>
							<span>{isFavourite?'已收藏 ':'收藏'}</span>
						</div>
						<div>
							<i className="fa fa-share"></i>
							<span>分享</span>
						</div>
					</div>
					
					<div className='b-right'>
					
						<Link to={{pathname:'/game/'+this.props.params.id,query:{name:this.state.data.name}}}>
							<i className="fa fa-gamepad"></i>
							<span>进入游戏</span>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

//将redux中store的state传递到组件的props上
let mapStateToProps = (state)=>{
	
	return state
}

export default connect(mapStateToProps)(Detail)
