import React,{Component} from 'react'
import Foot from '../footer/footer';
class Mine extends Component {
	render(){
		return (
			<div className='home-container main-box'>
				<header>
					<div className='left'></div>
					<div className='title'>我的</div>
					<div className='right'>
					</div>
				</header>
				<div className='home-content'>
					我是个人中心
				</div>
				<Foot path='/mine'/>
			</div>
			
		);
	}
}

export default Mine
