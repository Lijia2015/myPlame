import React,{Component} from 'react'
import axios from 'axios'
import qs from 'qs'
import userRegister from '../../../redux/actionCreaters/user_Login'
import {connect} from 'react-redux'
import {hashHistory} from 'React-router'

class Register extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			phone:'',
			code:'',
			nickName:'',
			password:''
		}
	}
	
	goBack(){
		
		this.props.history.goBack()
	}
	
	forCode(num){
		
		axios.post('/dola/app/user/newgetverifycode',qs.stringify({
			phone:num
			
		})).then((res)=>{
			
			console.log(res)
			
			this.setState({
				
				code:res.data.data.code
			})
			
		}).catch((err)=>{
			
			console.log(err,'验证码获取错误')
		})
		
	}
	
	handlePhone(event){
		
		this.setState({
			phone:event.target.value
		})
	}

	handleNick(event){
		
		this.setState({
			nickName:event.target.value
		})
	}
	
	handlePassword(event){
		
		this.setState({
			password:event.target.value
		})
	}
	
	sureRegister(){
		axios.post('/dola/app/user/newregister',qs.stringify({
			phone:this.state.phone,
			code:this.state.code,
			name:this.state.nickName,
			password:this.state.password
			
		})).then((res)=>{
			console.log(res,'注册成功了')
			sessionStorage.user = JSON.stringify(res.data.data)
			setTimeout(()=>{
				this.props.toLogin()
				hashHistory.push('/mine')
			},500)
			
			
		}).catch((err)=>{
			
			console.log(err,'注册失败错误')
		})
	}
	
	render(){
		return (
			<div className="login-container com-box">
				<header>
					<div className='left' onClick={this.goBack.bind(this)}>
						<i className='fa fa-angle-left'></i>
					</div>
					<div className='title'>注册</div>
					<div className='right'>
					</div>
				</header>
				
				<div className='input-box'>
					<div className='phone'>
						<span>手机号</span>
						<input type='text' placeholder='请输入手机号' value={this.state.phone} onChange={this.handlePhone.bind(this)}/>
						<button onClick={()=>this.forCode(this.state.phone)}>发送验证码</button>
					</div>
					<div>
						<span>验证码</span>
						<input type='text' placeholder='请输入您收到的验证码' value={this.state.code} />
					</div>
					<div>
						<span>昵称</span>
						<input type='text' placeholder='取一个响亮的昵称吧' value={this.state.nickName} onChange={this.handleNick.bind(this)}/>
					</div>
					<div>
						<span>密码</span>
						<input type='password' placeholder='6-32字母数字组合' value={this.state.password} onChange={this.handlePassword.bind(this)}/>
					</div>
				</div>
				
				<div className='btn-box'>
					<button onClick={this.sureRegister.bind(this)} className={this.state.phone&&this.state.password&&this.state.nickName&&this.state.code?'sureBtn':''}>确定</button>
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
			
			dispatch(userRegister())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)