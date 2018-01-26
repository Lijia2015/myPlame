import React,{Component} from 'react';
import Foot from '../footer/footer';
import {connect} from 'react-redux';
import {Link} from 'react-router'

class Mine extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			user:{}
		}
	}
	
	
	componentWillMount(){
		this.setState({
			user:this.props.user
		})
	}
	
	render(){
		
		console.log(this,'个人中心')
		
		return (
			<div className='home-container com-box'>
				<div className='home-content'>
					<div className='head-logo'>
						<img src={this.state.user.avatar} alt={this.state.user.name}/>
						<span>{this.state.user.name}</span>
					</div>
					<div className='Edit'>
						<Link to='/edit'>
							<i className="fa fa-pencil-square-o"></i>
						</Link>
					</div>
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
