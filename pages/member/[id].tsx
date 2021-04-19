import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import MemberList from '@components/member/memberList'
import MemberJoin from '@components/member/memberJoin'
import MemberLogin from '@components/member/memberLogin'
import { UserStateContext } from '@/core/store/userStore'

const Member = ({ setAlert }) => {
	const router = useRouter()
	console.log(router)
	const userState = useContext(UserStateContext)
	const { id } = router.query

	return (
		<div>
			{id === 'memberlist' && userState.accessToken ? (
				<MemberList />
			) : id === 'memberlogin' ? (
				<MemberLogin />
			) : id === 'memberjoin' ? (
				<MemberJoin setAlert={setAlert} />
			) : null}
		</div>
	)
}

export default Member
