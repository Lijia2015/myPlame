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
			page:1,
			type:1
		}
	}
	
	gameURL(id){
		
		return 'http://www.dolapocket.com/game/index_new.php?gid='+id+'#backUrl=http://m.dolapocket.com/#/gameDetail/'+id
	}
	
	goBack(){
		
		this.props.history.goBack()
	}
	
	changeShow(type){
		this.setState({
			type,
			gameList:[]
		})
		setTimeout(()=>{
			this.getDataUp(this.props.routeParams.id)
		},0)
	}
	
	getDataUp(classId){
		let that = this
		axios.post('/dola/app/game/newgetgamelist',qs.stringify({
			type:that.state.type,
			page:that.state.page,
			classId
		})).then((res)=>{
			
			that.setState({
				gameList:res.data.data.gameList
			})
			
		}).catch((err)=>{
			console.log(err,'数据请求错啦')
		})
	}
	
	componentWillMount(){
		this.getDataUp(this.props.routeParams.id)
	}
	
	render(){
		console.log(this)
		let {gameList} = this.state
		
		return(
			<div className='list-container com-box'>
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
								<button ><a href={this.gameURL(item.id)} style={{color:'#ff2741'}}>开始</a></button>
							</div>
						))
					}
				</div>
				
			</div>
		)
	}
}

export default GameList
