import React,{Component} from 'react'
import {Link} from 'react-router'
import Swiper from 'swiper/dist/js/swiper.min'

class Banner extends Component{
	
	componentDidUpdate(){
		
		new Swiper('.banner',{
			loop:true,
			autoplay: {
				disableOnInteraction: false,
			},
			pagination:{
				el:'.swiper-pagination',
				clickable :true
			}
		})
	}
	
	render(){
		let {data} = this.props;
		return (
			<div className='swiper-container banner'>
				<div className="swiper-wrapper">
			    	{data.map(item=>(
			    		<div className="swiper-slide" key={item.id}>
			    			<Link to={'/detail/'+item.id}>
			    				<img src={item.image} alt={item.imageName}/>
			    			</Link>
			    		</div>
			    	))}
			    </div>
			    <div className="swiper-pagination"></div>
			</div>
			
		)
	}
}

export default Banner