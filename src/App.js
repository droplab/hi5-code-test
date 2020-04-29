import React, { useEffect,useState,useCallback,useContext,useRef } from 'react'
import { size } from 'lodash-es'
import { TweenLite,TimelineLite,Expo } from 'gsap/all'

import Hero from './components/Hero/Hero'
import DogList from './components/DogList/DogList'
import DogDetail from './components/DogDetail/DogDetail'
import Loader from './components/Loader/Loader'

import { store } from './store.js'

import './styles/main.scss'

const App = () =>
{
	const globalState = useContext(store)
	const { breeds,selectedBreed } = globalState.state
	const [ isReady,setIsReady ] = useState(false)

	const DogDetailRef = useRef()  
	const DogListRef = useRef()
	
	useEffect(() =>
	{
		const fetchData = async () =>
		{
			try
			{
				let response = await fetch(`https://dog.ceo/api/breeds/list/all`)
				return await response.json()
			}
			catch(e)
			{
				console.error(e)
			}
		}
		  
		fetchData()
			.then(({ message }) =>
			{
				console.log('message',message)
				
				globalState.dispatch({ type: 'ADD_BREEDS', data:message })
			})

	},[])

	useEffect(() =>
	{
		setIsReady(size(breeds) > 0)

	},[breeds,isReady])

	useEffect(() =>
	{
		if(!isReady)
			return
		
		if(selectedBreed)
		{
			TweenLite.fromTo(DogDetailRef.current, 0.5, { autoAlpha:0 }, { autoAlpha:1, immediateRender:true })
		}
		else
		{
			TweenLite.to(DogDetailRef.current, 0.5, { autoAlpha:0 })
		}

	},[isReady,selectedBreed])

	return (
		<>
			<Hero>Dog-o-Pedia</Hero>
			
			<main id='main'>
				<DogList 
					ref={DogListRef}
					selectedBreed={selectedBreed}
				></DogList>

				{ selectedBreed ? 
					<DogDetail 
						ref={DogDetailRef}
						selectedBreed={selectedBreed}
					></DogDetail>
					:
					null
				}

				<Loader isReady={isReady} />
			</main>
		</>
	)
}

export default App