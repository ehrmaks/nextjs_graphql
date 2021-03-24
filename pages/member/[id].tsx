import React from 'react'
import { useRouter } from 'next/router'
import MemberList from '@components/member/memberList'
import MemberJoin from '@components/member/memberJoin'

const Member = () => {
	const router = useRouter()
	const { id } = router.query

	return <div>{id === 'memberlist' ? <MemberList /> : <MemberJoin />}</div>
}

export default Member
