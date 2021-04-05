import React from 'react'
import { useRouter } from 'next/router'
import MemberList from '@components/member/memberList'
import MemberJoin from '@components/member/memberJoin'
import MemberLogin from '@components/member/memberLogin'

const Member = () => {
	const router = useRouter()
	const { id } = router.query

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
