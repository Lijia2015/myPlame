
const defaultState = {//设置初始值
	num:1,
	user:localStorage.user?JSON.parse(localStorage.user):''
}

//创建纯函数
const reducer = (state = defaultState,action) =>{
	//每次返回一个新数据，将源对象所有可枚举的属性拷贝到目标对象中
	let new_state = Object.assign({},state)
	
	switch (action.type){
		case 'USER_LOGIN':
			new_state.num ++
			new_state.user = JSON.parse(localStorage.user)
			break;
		case 'LOGIN_OUT':
			new_state.user = ''
			break;
		default:
			break;
			
	}
	return new_state
	
}
	
export default reducer
