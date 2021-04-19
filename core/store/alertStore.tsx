import React, { createContext, useReducer, Dispatch, useCallback, useState } from 'react'

// 초기값 셋팅
const initialState = {
	open: false,
	size: undefined,
	title: '',
	msg: '',
}

type AlertStateType = {
	open: boolean
	size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
	title?: string
	msg?: string
}

type AlertActionType = {
	type: string
	size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
	title?: string
	msg?: string
}

type AlertDispatch = Dispatch<AlertActionType>

export const AlertStateContext = createContext<AlertStateType | null>(null)
export const AlertDispatchContext = createContext<AlertDispatch | null>(null)

const AlertReducer = (state: AlertStateType, { type, size, title, msg }: AlertActionType) => {
	switch (type) {
		case 'close':
			return { open: false, size, title, msg }
		case 'open':
			return { open: true, size, title, msg }
		default:
			throw new Error('Unsupported action...')
	}
}

const AlertStore = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(AlertReducer, initialState)

	return (
		<AlertStateContext.Provider value={state}>
			<AlertDispatchContext.Provider value={dispatch}>{children}</AlertDispatchContext.Provider>
		</AlertStateContext.Provider>
	)
}

export default AlertStore
