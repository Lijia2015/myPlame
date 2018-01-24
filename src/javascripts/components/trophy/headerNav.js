import React,{Component} from 'react'

class Header extends Component{
	render(){
		return (
			<header>
				<div className='left' onClick={this.props.changeShow}>
					<i className='fa'></i>
				</div>
				<div className='title'>{this.props.context}</div>
				<div className='right'></div>
			</header>
		)
	}
}

export default Header