import React, { useState, useContext } from 'react'
import { UserContext } from '@/core/store/users'
import axios from 'axios'

const MemberJoin = () => {
	const { userInfo, authActions } = useContext(UserContext)
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
			.post('http://localhost:8090/api/login', loginData)
			.then(res => {
				console.log(res)
				const resData = res.data.data
				authActions.authStateChanged({ type: 'ADD_USER', resData })
			})
			.catch(err => {
				console.error(err)
			})
	}

	return (
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
	)
}

export default MemberJoin
