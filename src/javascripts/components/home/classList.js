import React,{Component} from 'react'
import {Link} from 'react-router'

class ClassList extends Component{
	
	shouldComponentUpdate(props){
		
		if(props.data.length === this.props.data.length){
			return false
		}else{
			return true
		}
	}
	
	render(){
		let {data} = this.props;
		return (
			<div className='class-list clearfix'>
				{
					data.map(item=>(
						<Link to={{pathname:'/list/'+item.id,query:{name:item.name}}} key={item.id}>
							<div  className='list-item'>
								<img src={item.image} alt={item.name}/>
								<p>{item.name}</p>
							</div>
						</Link>
					))
				}
			</div>
			
		)
	}
}

export default ClassList