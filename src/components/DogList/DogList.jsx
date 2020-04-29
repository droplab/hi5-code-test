import React, { useRef,useEffect,useContext } from 'react'
import { map,random,each } from 'lodash-es'
import { TimelineLite,Expo } from 'gsap/all'
import DogListItem from '../DogListItem/DogListItem'
import { store } from '../../store.js'

import './DogList.scss'

const DogList = ({ breed }) =>
{
	const globalState = useContext(store)
	const { breeds,contentReady } = globalState.state
	const elRef = useRef()

	useEffect(() =>
	{
		if(contentReady)
		{
			const target = elRef.current.querySelectorAll('.in-view')
			const TL = new TimelineLite()

			target.forEach(v => v.classList.add('tweening'))

			TL
				.staggerFromTo(target, 1, 
					{ autoAlpha:0,y:25 }, 
					{ 
						force3D:true, 
						autoAlpha:1, 
						y:0, 
						ease: Expo.easeOut
					},0.025
				)
				.set(target, { clearProps:'transform,visibility' })
				.call(target =>
				{
					target.forEach(v => v.classList.remove('tweening'))

				},[target])
		}
		
	},[contentReady])
	
	return (
		<div 
			ref={elRef} 
			id='dog-list'
		>
			{ 
				map(breeds, (subtypes,type) =>
				{
					let randomColor = `rgba(${random(0,255)},${random(0,255)},${random(0,255)},0.5)`

					return (
						<DogListItem 
							key={type} 
							type={type} 
							subtypes={subtypes} 
							color={randomColor}
						/>
					)
				})
			}
		</div>
	)
}

export default DogList