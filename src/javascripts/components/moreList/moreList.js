import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import qs from 'qs'
class MoreList extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			page:1,
			gameList:[]
		}
	}
	
	goBack(){
		
		this.props.history.goBack()
	}
	
	gameURL(id){
		
		return 'http://www.dolapocket.com/game/index_new.php?gid='+id+'#backUrl=http://m.dolapocket.com/#/gameDetail/'+id
	}
	
	getDataUp(id){
		axios.post('/dola/app/game/newgetthemegamelist',qs.stringify({
			page:this.state.page,
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
	
	componentWillMount(){
		
		this.getDataUp(this.props.params.id)
	}
	
	render(){
		
		let {gameList} = this.state
		
		
		return (
			
			<div className='more-container com-box'>
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
