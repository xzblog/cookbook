import React from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'components';
import './project.scss';


const Project = (props) => {
	const {data} = props;

	return(
		<Link to={`/freshDetail/${data._id}`} className='project' >
			<div className='pic'>
				<img src={data.pic} alt='' />
			</div>
			<div className='cont'>
				<h3 className='title'>{data.name}</h3>
				<p  className='desc'>{data.desc}</p>
				<div className='tags'>{data.tags.map((item, i)=>(<em className='tag' key={i}>{item}</em>))}</div>
				<div className='price'>{data.price} <del className='del'>{data.priceDel}</del></div>
				<div className='add-cart'>
					<Icon type='cart-add-o' size='0.26'/>
				</div>
			</div>
		</Link>
	)
}
export default Project;
