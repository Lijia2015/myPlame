import React,{Component} from 'react'
import userLogin from '../../../redux/actionCreaters/user_Login'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {hashHistory} from 'React-router'
import axios from 'axios'
import qs from 'qs'


class Login extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			phone:'',
			password:''
		}
	}
	
	handlePhone(event){
		
		this.setState({
			phone:event.target.value
		})
	}
	
	handlePassword(event){
		
		this.setState({
			password:event.target.value
		})
	}
	
	goBack(){
		
		this.props.history.goBack()
	}
	
	goLogin(){
		
		axios.post('/dola/app/user/newlogin',qs.stringify({
			phone:this.state.phone,
			password:this.state.password
		})).then((res)=>{
			
			console.log(res,'登录成功了')
			
			localStorage.user = JSON.stringify(res.data.data)
			setTimeout(()=>{
				this.props.toLogin()
				hashHistory.push('/mine')
			},500)
			
		}).catch((err)=>{
			
			console.log(err,'登录失败了')
			
		})
		
	}
	
	render(){
		console.log(this.state,'login')
		return (
			<div className="login-container com-box">
				<header>
					<div className='left' onClick={this.goBack.bind(this)}>
						<i className='fa fa-angle-left'></i>
					</div>
					<div className='title'>登录</div>
					<div className='right'>
						<Link to='/register'>注册</Link>
					</div>
				</header>
				
				<div className='input-box'>
					<div>
						<span>手机号</span>
						<input type='text' placeholder='请输入手机号' value={this.state.phone} onChange={this.handlePhone.bind(this)}/>
					</div>
					
					<div>
						<span>密码</span>
						<input type='password' placeholder='请输入密码' value={this.state.password} onChange={this.handlePassword.bind(this)}/>
					</div>
				</div>
				
				<div className='btn-box'>
					<button onClick={()=>this.goLogin()} className={this.state.phone&&this.state.password?'sureBtn':''}>确定</button>
					<p>忘记密码</p>
				</div>
				
				
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
		toLogin:()=>{
			
			dispatch(userLogin())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
