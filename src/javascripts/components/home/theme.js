import React,{Component} from 'react'
import {Link} from 'react-router'

class Theme extends Component{
	
	shouldComponentUpdate(props){
		
		if(props.data.length === this.props.data.length){
			return false
		}else{
			return true
		}
	}
	
	gameURL(id){
		
		return 'http://www.dolapocket.com/game/index_new.php?gid='+id+'#backUrl=http://m.dolapocket.com/#/gameDetail/'+id
	}
	
	render(){
		let {data} = this.props;
		console.log(data)
		return (
			<div className='theme-list'>
				{
					data.map(item=>(
						<div key={item.id} className='item-container clearfix'>
							<div className='item-title'>
								<span>{item.title}</span>
								{item.type==='1'?<Link to={{pathname:'/more/'+item.id,query:{name:item.title}}}><span className='more'>更多</span></Link>:''}
							</div>
							{
								item.image?<Link to={'/detail/'+item.imageId}><img src={item.image} alt={item.title} className={item.imageId==='0'?'imgH title-img':'title-img'} /></Link>:''
							}
							<div className='item-content'>
								
								{
									item.type==='1'?<div className='row-tt clearfix'>
										{	
											item.gameList.map(list=>(
												<div className='row-item' key={list.id}>
													<Link to={'/detail/'+list.id}>
														<img src={list.image} alt={list.name}/>
														<p>{list.name}</p>
													</Link>
												</div>
											))
										}
									</div>:<div className='colum-tt clearfix'>
										{
											item.gameList.map(list=>(
												<div className='colum-item' key={list.id}>
													<Link to={'/detail/'+list.id}>
														<img src={list.image} alt={list.name}/>
														<div className='info-el'>
															<span className='title'>{list.name}</span>
															<span className='sign' style={{'background':list.labelList[0].color}}>{list.labelList[0].name}</span>
															<span className='intro'>{list.description}</span>
														</div>	
													</Link>
													<p className='btn'>
														<a href={this.gameURL(list.id)}>开始</a>
													</p>
												</div>
											))
										}
									</div>
								}
							</div>
						</div>
					))
				}
			</div>
		)
	}
	
}

export default Theme
