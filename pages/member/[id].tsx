import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import MemberList from '@components/member/memberList'
import MemberJoin from '@components/member/memberJoin'
import MemberLogin from '@components/member/memberLogin'
import { UserStateContext } from '@/core/store/userStore'

const Member = () => {
	const router = useRouter()
	const userState = useContext(UserStateContext)
	const { id } = router.query

	if (id === 'memberlist' && !userState.accessToken) {
		router.push('/member/memberlogin')
	}

	return (
		<div>
			{id === 'memberlist' ? (
				<MemberList />
			) : id === 'memberlogin' ? (
				<MemberLogin />
			) : id === 'memberjoin' ? (
				<MemberJoin />
			) : null}
		</div>
	)
}

export default Member
