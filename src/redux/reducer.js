
const defaultState = {//设置初始值
	user:sessionStorage.user?JSON.parse(sessionStorage.user):'',
	bannerList:[],
	classList:[],
	themeList:[]
	
}

//创建纯函数
const reducer = (state = defaultState,action) =>{
	//每次返回一个新数据，将源对象所有可枚举的属性拷贝到目标对象中
	let new_state = Object.assign({},state)
	
	switch (action.type){
		case 'USER_LOGIN':
			new_state.user = JSON.parse(sessionStorage.user)
			break;
		case 'LOGIN_OUT':
			new_state.user = ''
			break;
		case 'HOME-LOAD':
			new_state.bannerList = action.bannerList
			new_state.classList = action.classList
			new_state.themeList = action.themeList
			break;
		case 'LOAD-MORE':
			new_state.themeList = state.themeList.concat(action.themeList)
			break;
		default:
			break;
			
	}
	return new_state
	
}
	
export default reducer
