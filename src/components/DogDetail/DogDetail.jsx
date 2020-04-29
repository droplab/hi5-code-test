import React, { useEffect,useContext,forwardRef } from 'react'
import { useFetch } from '../../libs/useFetch'
import { store } from '../../store.js'

import './DogDetail.scss'

const DogDetail = ({ selectedBreed },ref) =>
{
	const globalState = useContext(store)
	const dataFetch = useFetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`,{})
	
	if(!dataFetch.response)
	{
		return (
			<div 
				ref={ref}
				id='dog-detail'
				onClick={() => 
				{ 
					globalState.dispatch({ type:'HIDE_BREED' }) 
				}}
			>
				<div className='content loading'></div>
			</div>
		)
	}

	const pic = dataFetch.response.message
	
	return (
		<div 
			ref={ref}
			id='dog-detail'
			onClick={() => 
			{ 
				globalState.dispatch({ type:'HIDE_BREED' }) 
			}}
		>
			<div className='content'>
				<h2>{selectedBreed}</h2>
				<div className='img-container'>
					<div className='spinner fa-4x'>
						<i className="fas fa-spinner fa-spin"></i>
					</div>
					<img className='doggy-pic' src={pic} />
				</div>
					
			</div>
			<button className='btn-close'>X</button>
		</div>
	)
}

export default forwardRef(DogDetail)