import React, { createContext, useReducer, Dispatch } from 'react'

type InitialType = {
	type: string
	payload: object
}
const initialState = {
	type: '',
	payload: '',
}

// 나중에 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보내겠습니다.
export type UserType = {
	accessToken: string
	id: number
	loginId: string
	userNm: string
	email: string
	userId: string
}

type Action = { type: 'ADD_USER'; payload: UserType } | { type: 'SET_INIT_USER'; payload: UserType }

export const UserContext = createContext<UserType | undefined>(undefined)

const UserInfoReducer = (userInfo: UserType, { type, payload }: Action): UserType => {
	switch (type) {
		case 'ADD_USER':
			// const payload = action.payload
			// userInfo.accessToken = payload.accessToken
			// userInfo.id = payload.id
			// userInfo.loginId = payload.loginId
			// userInfo.userNm = payload.userNm
			// userInfo.userId = payload.userId
			return payload
		case 'SET_INIT_USER':
			return {} as UserType

		default:
			break
	}
}

const UserStore = ({ children }: { children: React.ReactNode }) => {
	const [userInfo, dispatch] = useReducer(UserInfoReducer, initialState)

	// const setInitUser = () => {
	// 	dispatch({ type: 'SET_INIT_USER', payload: users })
	// }
	// const userData = {
	// 	accessToken: '',
	// 	id: 0,
	// 	loginId: '',
	// 	userNm: '',
	// 	email: null,
	// 	userId: null,
	// }
	const actions = {
		authStateChanged: (user): Action => {
			console.log(user)
			if (user) {
				dispatch({ type: 'ADD_USER', payload: user.resData })
			}
		},
	}

	return <UserContext.Provider value={{ userInfo, authActions: actions }}>{children}</UserContext.Provider>
}

export default UserStore
