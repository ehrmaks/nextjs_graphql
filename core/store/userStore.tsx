import React, { createContext, useReducer, Dispatch, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

// 권한이 필요한 asPath List
const authPathList = ['/member/memberlist']

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
	const [cookies, , removeCookie] = useCookies(['userInfo'])
	const router = useRouter()

	useEffect(() => {
		if (authPathList.includes(router.asPath)) validateAccessToken()
	}, [router.asPath])

	useEffect(() => {
		// 로그인 상태라면 쿠키의 정보를 스토어에 저장
		if (cookies.userInfo) {
			// 최초에 토큰이 존재한다면 토큰 유효성 검사 후 유저 정보 저장
			if (validateAccessToken()) dispatch({ type: 'ADD_USER', payload: cookies.userInfo })
			else dispatch({ type: 'SET_INIT_USER', payload: initialState })
		}
		// 로그인 정보가 쿠키에 없다면 유저 정보 초기화
		else dispatch({ type: 'SET_INIT_USER', payload: initialState })
	}, [])

	function validateAccessToken() {
		let accessToken
		if (cookies.userInfo) accessToken = cookies.userInfo.accessToken

		if (!accessToken) {
			// 로그인 페이지로 이동
			router.push('/member/memberlogin')
			alert('권한이 없습니다. 로그인해 주세요.')
			return false
		}

		// jwt를 decode해서 payload를 추출한다.
		const decodePayload = jwtDecode(accessToken) as { exp: number }
		// exp가 UNIX Time으로 나오기 때문에 변환을 해준다.
		const exp = new Date(decodePayload.exp * 1000).getTime()
		const now = new Date().getTime() // 테스트시 주석처리 하면 됨

		// 토큰세션 유지시간 테스트용 딜레이 타임
		// const delayTime = 3600000; // 딜레이 타임 (1000 = 1초)
		// const now = new Date().getTime() + (3600000 - delayTime);

		if (now < exp) {
			return true
		} else {
			credentialExpiration()
			return false
		}
	}

	// 인증정보 만료 됐을 경우 실행되는 함수
	function credentialExpiration() {
		// 쿠키를 지움
		removeCookie('userInfo', {
			domain: location.href.includes('localhost') ? 'localhost' : process.env.NEXT_COOKIE_DOMAIN,
			path: '/',
		})

		// user state 초기화
		dispatch({
			type: 'SET_INIT_USER',
			payload: initialState,
		})

		// 로그인 페이지로 이동
		router.push('/member/memberlogin')

		alert('권한이 없습니다. 로그인해 주세요.')
	}

	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	)
}

export default UserStore
