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
			page:1,
			gameList:[],
			isShow : true,
			type:1,
			top:0
		}
		this.changeShow = this.changeShow.bind(this)
	}
	
	changeShow(type){
		
		this.setState({
			type,
			gameList:[]
		})
		this.loadData(type)
		
	}
	
	gameURL(id){
		
		return 'http://www.dolapocket.com/game/index_new.php?gid='+id+'#backUrl=http://m.dolapocket.com/#/gameDetail/'+id
	}
	
	loadData(type){
		
		axios.post('/dola/app/game/newgetgameleaderboard',qs.stringify({
			page:this.state.page,
			type
		})).then(({data})=>{
			console.log(data)
			
			this.setState({
				gameList:data.data.gameList
			})
		}).catch((err)=>{
			console.log('数据请求错误'+err)
		})
		
	}
	
	componentWillMount(){
		this.loadData(this.state.type)
	}

	render(){
		console.log(this,'数据更改了')
		return (
			<div className='home-container main-box com-box'>
				
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
								<button ><a href={this.gameURL(item.id)}>开始</a></button>
							</div>
						))
					}
				</div>
				<Foot path='/trophy'/>
			</div>
			
		);
	}
}

export default Trophy
