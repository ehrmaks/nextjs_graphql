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
		alert('권한이 없습니다. 로그인해 주세요.')
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
