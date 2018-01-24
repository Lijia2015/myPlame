
const defaultState = {//设置初始值
	num:1
}

//创建纯函数
const reducer = (state = defaultState,action) =>{
	//每次返回一个新数据，将源对象所有可枚举的属性拷贝到目标对象中
	let new_state = Object.assign({},state)
	
	switch (action.type){
		case 'ADD_NUM':
			new_state.num ++
			break;
			
		default:
			break;
			
	}
	return new_state
	
}
	
export default reducer
