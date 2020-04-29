import React, { useRef,useEffect,useContext } from 'react'
import { TweenLite,TimelineLite,Expo } from 'gsap/all'
import { store } from '../../store.js'

import './Loader.scss'

const Loader = ({ isReady }) =>
{
	const globalState = useContext(store)
	const loaderRef = useRef()
	const spinnerRef = useRef()

	useEffect(() =>
	{
		TweenLite.fromTo(spinnerRef.current, 1, { autoAlpha:0 }, { autoAlpha:1, ease: Expo.easeOut, delay:0.5 })

	},[])
	
	useEffect(() =>
	{
		if(isReady)
		{
			const TL = new TimelineLite()
			TL
				.to(spinnerRef.current, 1, { autoAlpha:0, ease: Expo.easeOut },2)
				.to(loaderRef.current, 0.5, { autoAlpha:0, ease: Expo.easeOut })
				.call((globalState) =>
				{
					globalState.dispatch({ type: 'CONTENT_READY' })

				},[globalState],'-=1')
		}

	},[isReady])
	
	return (
		<div 
			ref={loaderRef}
			className='loader'
		>
			<div 
				ref={spinnerRef}
				className='loader__spinner fa-4x'
			>
				<i className="fas fa-spinner fa-spin"></i>
			</div>
		</div>
	)
}

export default Loader