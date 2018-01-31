import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import qs from 'qs'
class MoreList extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			gameList:[]
		}
		this.page=1
	}
	
	goBack(){
		
		this.props.history.goBack()
	}
	
	gameURL(id){
		
		return 'http://www.dolapocket.com/game/index_new.php?gid='+id+'#backUrl=http://m.dolapocket.com/#/gameDetail/'+id
	}
	
	getDataUp(id){
		axios.post('/dola/app/game/newgetthemegamelist',qs.stringify({
			page:this.page,
			type:1,
			themeId:id
		})).then((res)=>{
			console.log(res)
			
			this.setState({
				gameList:res.data.data.gameList
			})
			
		}).catch((err)=>{
			console.log(err,'数据请求出错了')
		})
	}
	
	loadMore(id){
		axios.post('/dola/app/game/newgetthemegamelist',qs.stringify({
			page:this.page,
			type:1,
			themeId:id
		})).then((res)=>{
			console.log(res)
			
			if(res.data.data.gameList.length){
				this.setState({
					gameList:this.state.gameList.concat(res.data.data.gameList)
				})
			}else{
				alert('数据加载完毕了')
			}
			
		}).catch((err)=>{
			console.log(err,'数据请求出错了')
		})
	}
	
	componentWillMount(){
		
		this.getDataUp(this.props.params.id)
	}
	
	handler(){
		
		let that = this;
		window.onscroll = function(){
			let sc = window.scrollY;
			let h = window.screen.height;
			let scH = that.refs.bodyBox.scrollHeight;
			if(sc+h === scH){
				
				that.page++
				
				that.loadMore(that.props.routeParams.id)
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
								<button ><a href={this.gameURL(item.id)} style={{color:'#ff2741'}}>开始</a></button>
							</div>
						))
					}
				</div>
				
			</div>
		)
	}
}

export default MoreList
