import React, { useContext,useRef,useEffect,useState } from 'react'
import { useIntersection } from 'use-intersection'
import { store } from '../../store.js'

import './DogListItem.scss'

const DogListItem = ({ type,color,rendered }) =>
{
	const globalState = useContext(store)
	const { contentReady } = globalState.state
	const elRef = useRef()
	const styleRef = useRef({ visibility:'hidden' })
	const inView = useIntersection(elRef)

	useEffect(() =>
	{
		if(contentReady)
		{
			styleRef.current.visibility = ''
		}
	
	},[contentReady])
	
	return (
		<div 
			ref={elRef}
			className={`dog-list-item ${rendered ? 'rendered' : ''} ${inView ? 'in-view' : ''}`}
			data-breed={type}
			style={{ backgroundColor: color, ...styleRef.current }}
			onClick={() => 
			{ 
				globalState.dispatch({ type:'SHOW_BREED', selectedBreed:type }) 
			}}
		>
			<div className='icon'>
				<i className="fas fa-paw"></i>
			</div>
			<strong>{type}</strong>
		</div>
	)
}

export default DogListItem