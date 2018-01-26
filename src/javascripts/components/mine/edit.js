import React,{Component} from 'react'
import {connect} from 'react-redux'
import loginOut from '../../../redux/actionCreaters/login_Out'
import {hashHistory} from 'React-router'

class Edit extends Component{
	
	goBack(){
		
		this.props.history.goBack()
	}
	
	loginOut(){
		
		localStorage.removeItem('user')
		
		this.props.toLoginOut();
		
		setTimeout(()=>{
			hashHistory.push('/home')
		},500)
	
	}
	
	render(){
		console.log(this.props,'编辑中心')
		return (
			<div className='edit-container'>
				<header>
					<div className='left' onClick={this.goBack.bind(this)}>
						<i className='fa fa-angle-left'></i>
					</div>
					<div className='title'>账户设置</div>
					<div className='right'>
					</div>
				</header>
				
				<div className='edit'>
					<div className='edit-one'>
						<span>编辑个人资料</span>
					</div>
					<div className='edit-two'>
						<span>修改密码</span>
					</div>
				</div>
				
				<div className='edit'>
					<div className='edit-one'>
						<span>意见反馈</span>
					</div>
					<div className='edit-two'>
						<span>关于我们</span>
					</div>
				</div>
				
				<button onClick={()=>this.loginOut()}>退出登录</button>
				
			</div>
		)
	}
}

let mapStateToProps = (state) =>{
	return {
		_user:state.user
	}
}

let mapDispatchToProps = (dispatch)=>{
	
	return {
		toLoginOut:()=>{
			
			dispatch(loginOut())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Edit)
