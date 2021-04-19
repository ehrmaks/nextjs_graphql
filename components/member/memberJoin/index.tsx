import React, { useEffect, useContext, useState, Dispatch, SetStateAction } from 'react'
import { UserStateContext } from '@/core/store/userStore'
import { useRouter } from 'next/router'
import { AlertDispatchContext, AlertStateContext } from '@/core/store/alertStore'
import { Button } from 'semantic-ui-react'

const MemberJoin = ({ setAlert }) => {
	const router = useRouter()
	const userState = useContext(UserStateContext)
	const { size, open } = useContext(AlertStateContext)
	const dispatch = useContext(AlertDispatchContext)

	useEffect(() => {
		if (userState.accessToken) {
			router.push('/')
		}
	}, [])

	return (
		<div>
			{!userState.accessToken && (
				<div>
					<h1>회원가입존</h1>

					<Button onClick={() => setAlert({ title: '가입', msg: '입력해 주세요.' })}>가입하기</Button>
				</div>
			)}
		</div>
	)
}

export default MemberJoin
