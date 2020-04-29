import React from 'react'
import bgImage from './assets/sebastien-lavalaye-qJQRJAnFuTI-unsplash.jpg'

import './Hero.scss'

const Hero = ({ children }) =>
{
	return (
		<div 
			id='hero'
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<h1>{children}</h1>
		</div>
	)
}

export default Hero