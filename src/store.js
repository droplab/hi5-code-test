import React,{ createContext,useReducer } from 'react'

const initialState = 
{
	contentReady: false,
	breeds: {},
	selectedBreed: null
}

const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => 
{
	const [state,dispatch] = useReducer((state,action) => 
	{
		console.log('action',action)
		
		switch(action.type) 
		{
			case 'CONTENT_READY':
				
				return { ...state, contentReady: true }
			
			case 'ADD_BREEDS':
				
				return { ...state, breeds: action.data }
			
			case 'SHOW_BREED':
			
				return { ...state, selectedBreed: action.selectedBreed }
			
			case 'HIDE_BREED':
			
				return { ...state, selectedBreed: null }
			
			default:

				throw new Error('unknown action.type',action.type)
		}

	}, initialState)

	return (
		<Provider 
			value={{ state, dispatch }}
		>
			{children}
		</Provider>
	)

}

export { store, StateProvider }