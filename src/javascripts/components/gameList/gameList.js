import React,{Component} from 'react'

class GameList extends Component{
	
	
	componentWillMount(){
		
		console.log(this.props.routeParams.id)
	}
	
	goBack(){
		
		this.props.history.goBack()
	}
	
	render(){
		return(
			<div className='list-container'>
				<header>
					<div className='left' onClick={this.goBack.bind(this)}>
						<i className='fa fa-angle-left'></i>
					</div>
						<div className='title'>{'1242534'}</div>
						<div className='right'>
					</div>
				</header>
			</div>
		)
	}
}

export default GameList
