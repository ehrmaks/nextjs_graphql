import React, { createContext, useReducer, Dispatch } from 'react'

// 초기값 셋팅
export const initialState = {
	accessToken: '',
	id: 0,
	loginId: '',
	userNm: '',
	email: '',
	userId: '',
}

// 나중에 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보내겠습니다.
export type UserState = {
	accessToken: string
	id: number
	loginId: string
	userNm: string
	email: string
	userId: string
}

type UserAction = { type: 'ADD_USER'; payload: UserState } | { type: 'SET_INIT_USER'; payload: UserState }

type UserDispatch = Dispatch<UserAction>

export const UserStateContext = createContext<UserState | null>(null)
export const UserDispatchContext = createContext<UserDispatch | null>(null)

const UserInfoReducer = (state: UserState, { type, payload }: UserAction): UserState => {
	switch (type) {
		case 'ADD_USER':
			return payload
		case 'SET_INIT_USER':
			return initialState
		default:
			break
	}
}

const UserStore = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(UserInfoReducer, initialState)

	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	)
}

export default UserStore
