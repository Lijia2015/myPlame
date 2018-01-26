import React,{Component} from 'react';
import Foot from '../footer/footer';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import axios from 'axios'
import qs from 'qs'

class Mine extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			navs:[
				{title:'历史',id:1},
				{title:'收藏',id:2},
				{title:'礼包',id:3}
			],
			gameList:[],
			presentList:[],
			type:1,
			page:1
		}
		
	}
	
	gameURL(id){
		
		return 'http://www.dolapocket.com/game/index_new.php?gid='+id+'#backUrl=http://m.dolapocket.com/#/gameDetail/'+id
	}
	
	changeShow(type){
		this.setState({
			type,
			gameList:[],
			presentList:[],
			page:1
		})
		
		switch(type){
			case 1 :
				this.getUserHistory()
				break;
			case 2 :
				this.getUserCollect()
				break;
			case 3 :
				this.getUserPresent()
				break;
			default:
				break;
		}
	}
	
	componentWillMount(){
		
		this.getUserHistory()
	}
	
	getUserHistory(){
		let params = {
			uid:this.props.user.uid,
			token:this.props.user.token,
			page:this.state.page
		}
		
		axios.post('/dola/app/game/newgethistorylist',qs.stringify(params)).then((res)=>{
			
			this.setState({
				gameList:res.data.data.gameList
			})
			
			
		}).catch((err)=>{
			
			console.log(err)
		})
		
	}
	
	getUserCollect(){
		let params = {
			uid:this.props.user.uid,
			token:this.props.user.token,
			page:this.state.page
		}
		axios.post('/dola/app/game/newgetfavouritelist',qs.stringify(params)).then((res)=>{
			
			this.setState({
				gameList:res.data.data.gameList
			})
			
		}).catch((err)=>{
			console.log(err)
		})
	}
	getUserPresent(){
		let params = {
			uid:this.props.user.uid,
			token:this.props.user.token,
			page:this.state.page
		}
		axios.post('/dola/app/game/newgetuserpresentlist',qs.stringify(params)).then((res)=>{
			
			this.setState({
				presentList:res.data.data.presentList
			})
			
		}).catch((err)=>{
			console.log(err)
		})
	}
	
	render(){
		
		console.log(this,'个人中心')
		let {gameList,presentList} = this.state
		return (
			<div className='mine-container main-box'>
				<div className='mine-content com-box'>
					<div className='head-logo'>
						<img src={this.props.user.avatar} alt={this.props.user.name}/>
						<span>{this.props.user.name}</span>
					</div>
					<div className='Edit'>
						<Link to='/edit'>
							<i className="fa fa-pencil-square-o"></i>
						</Link>
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
					
					{
						<div className='content'>
							<div className={this.state.type===1?'list-content clearfix':'hideEL'}>
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
											<button ><a href={this.gameURL(item.id)} style={{color:'#ff2741'}}>开始</a></button>
										</div>
									))
								}
							</div>
							<div className={this.state.type===2?'list-content clearfix':'hideEL'}>
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
											<button ><a href={this.gameURL(item.id)} style={{color:'#ff2741'}}>开始</a></button>
										</div>
									))
								}
							</div>
							<div className={this.state.type===3?'presentEL':'hideEL'}>
								{
									presentList.map(item=>(
										<div className='pre-item' key={item.id}>
											<div className='pre-info'>
												<span>
													<span className='pre-count'>{item.gameName}</span>
													{item.name}
												</span>
												<span className='pre-content'>礼包内容 : {item.description}</span>
												<span className='pre-time'>有效时间 : {item.time}</span>
											</div>
										</div>
									))
								}
							</div>
						</div>
						
					}
					
				</div>
				
				<Foot path='/mine'/>
			</div>
			
		);
	}
}

let mapStateToProps = (state)=>{
	
	return state
}

export default connect(mapStateToProps)(Mine)
