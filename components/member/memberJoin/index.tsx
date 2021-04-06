import React, { useEffect, useContext } from 'react'
import { UserStateContext, UserDispatchContext, initialState } from '@/core/store/userStore'
import { useRouter } from 'next/router'

const MemberJoin = () => {
	const router = useRouter()
	const userState = useContext(UserStateContext)
	const dispatch = useContext(UserDispatchContext)

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
				</div>
			)}
		</div>
	)
}

export default MemberJoin
