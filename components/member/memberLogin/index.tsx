import React, { useEffect, useState, useContext } from 'react'
import { UserStateContext, UserDispatchContext } from '@/core/store/userStore'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const MemberJoin = () => {
	const router = useRouter()
	const userState = useContext(UserStateContext)
	const dispatch = useContext(UserDispatchContext)
	const [, setCookie] = useCookies(['userInfo'])

	useEffect(() => {
		if (userState.accessToken) {
			router.push('/')
		}
	}, [])

	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})

	const changeUserData = e => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		})
	}
	const handleClickLogin = () => {
		axios
			.post(`${process.env.NEXT_PUBLIC_API_URL + '/api/login'}`, loginData)
			.then(res => {
				const resData = res.data.data
				dispatch({ type: 'ADD_USER', payload: resData })
				router.push('/')
				setCookie('userInfo', resData)
			})
			.catch(err => {
				console.error(err)
			})
	}

	return (
		<div>
			{!userState.accessToken && (
				<div>
					<h1>로그인</h1>
					<div>
						<input
							type="text"
							name="email"
							placeholder="아이디를 입력해 주세요."
							value={loginData.email}
							onChange={changeUserData}
						/>
						<input
							type="password"
							name="password"
							placeholder="비밀번호를 입력해 주세요."
							value={loginData.password}
							onChange={changeUserData}
						/>
						<button onClick={handleClickLogin}>로그인</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default MemberJoin
