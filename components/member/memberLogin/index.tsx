import React, { useEffect, useState, useContext } from 'react'
import { UserStateContext, UserDispatchContext } from '@/core/store/userStore'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Button, Form, Header, Icon } from 'semantic-ui-react'
import styles from '@/styles/Login.module.scss'

const MemberLogin = () => {
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
		message1: '',
		message2: '',
	})

	const changeUserData = e => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
			message1: '',
			message2: '',
		})
	}

	const validationChk = () => {
		if (!loginData.email) {
			setLoginData({
				...loginData,
				message1: '아이디를 입력해 주세요.',
			})
			return false
		}
		if (!loginData.password) {
			setLoginData({
				...loginData,
				message2: '비밀번호를 입력해 주세요.',
			})
			return false
		}
		return true
	}

	const handleClickLogin = () => {
		if (validationChk()) {
			axios
				.post(`${process.env.NEXT_PUBLIC_API_URL + '/api/login'}`, loginData)
				.then(res => {
					const resData = res.data
					if (res.data.success) {
						dispatch({ type: 'ADD_USER', payload: resData.data })
						router.push('/')
						setCookie('userInfo', resData.data)
					} else {
						if (resData.code === 'ESVC005') {
							setLoginData({
								...loginData,
								message1: resData.msg,
							})
						} else if (resData.code === 'ESVC022') {
							setLoginData({
								...loginData,
								message1: resData.msg,
							})
						}
					}
				})
				.catch(err => {
					console.log(err)
					// const errData = err.response.data
					// if (errData.code === 'ESVC005') {
					// 	setLoginData({
					// 		...loginData,
					// 		message1: errData.msg,
					// 	})
					// } else if (errData.code === 'ESVC022') {
					// 	setLoginData({
					// 		...loginData,
					// 		message1: errData.msg,
					// 	})
					// }
				})
		}
	}

	return (
		<>
			{!userState.accessToken && (
				<div className={styles.wrap}>
					<div className={styles.login_header}>
						<Header as="h2">Jookbob2 World</Header>
					</div>
					<Form>
						<Form.Field>
							<div className={styles.login_div}>
								<input
									style={{ border: 'none', borderBottom: 'solid 1px #263343', width: 400 }}
									type="text"
									name="email"
									placeholder="아이디를 입력해 주세요."
									value={loginData.email}
									onChange={changeUserData}
								/>
								{loginData.message1 && (
									<div className={styles.login_status}>
										<p>{loginData.message1}</p>
									</div>
								)}
							</div>
						</Form.Field>
						<Form.Field>
							<div className={styles.login_div}>
								<input
									style={{ border: 'none', borderBottom: 'solid 1px #263343', width: 400 }}
									type="password"
									name="password"
									placeholder="비밀번호를 입력해 주세요."
									value={loginData.password}
									onChange={changeUserData}
								/>
								{loginData.message2 && (
									<div className={styles.login_status}>
										<p>비밀번호를 확인해 주세요.</p>
									</div>
								)}
							</div>
						</Form.Field>
						<Button color="blue" size="huge" onClick={() => handleClickLogin()}>
							<Icon name="key"></Icon>
							로그인
						</Button>
					</Form>
				</div>
			)}
		</>
	)
}

export default MemberLogin
