import React,{Component} from 'react'
import {hashHistory} from 'React-router'

class Game extends Component{
	
	goBack(){
		
		hashHistory.push('/home')
	}
	
	render(){
		
		console.log(this.props)
		
		return(
			<div className='game-box'>
				<header>
					<div className='left' onClick={this.goBack.bind(this)}>
						<i className='fa fa-angle-left'></i>
					</div>
					<div className='title'>{this.props.location.query.name}</div>
						<div className='right'>
					</div>
				</header>
				<div className='game-content'>
					<iframe title={this.props.location.query.name} id="gFrame" scrolling="no" src={'http://www.dolapocket.com/game/index_new.php?gid='+this.props.params.id+'#backUrl=http://m.dolapocket.com/#/gameDetail/'+this.props.params.id} height="100%" width="100%">
					</iframe>
				</div>
				
				
			</div>
		)
	}
	
}

export default Game