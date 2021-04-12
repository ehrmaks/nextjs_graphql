import React, { useState, useEffect } from 'react'
import styles from '@/styles/Member.module.scss'
import { GET_MEMBERLIST } from '@/core/gql/member/memberGql'
import { client } from '@/core/config/apollo'
import Meta from '@/components/common/Meta'
import { useRouter } from 'next/router'

const MemberList = () => {
	const router = useRouter()
	const [pageOptions, setPageOption] = useState({
		page: 0,
		size: 5,
		totalPages: 0,
	})

	const [memberData, setMemberData] = useState([])

	const setTotalPage = totalPages => {
		if (pageOptions.totalPages === 0) {
			setPageOption({
				...pageOptions,
				totalPages: totalPages,
			})
		}
	}

	useEffect(() => {
		client
			.query({
				query: GET_MEMBERLIST,
				variables: {
					page: pageOptions.page,
					size: pageOptions.size,
				},
			})
			.then(res => {
				const resData = res.data.getMemberList.data
				setMemberData(resData.content)
				setTotalPage(resData.totalPages)
			})
			.catch(err => {
				console.log({ err })
				if (err.networkError.statusCode === 401) {
					router.push('/member/memberlogin')
				}
			})
	}, [])

	return (
		<div className={styles.member__body}>
			<Meta title="회원관리 | 회원목록" desc="회원 목록 조회"></Meta>
			<div className={styles.member__title}>
				<h3>회원 목록</h3>
			</div>

			<div className={styles.member__table}>
				<div className={styles.total__page}>
					<h4>총 페이지 수 : {pageOptions.totalPages}개</h4>
				</div>
				<table>
					<thead>
						<tr>
							<th style={{ width: '100px' }}>회원번호</th>
							<th style={{ width: '100px' }}>아이디</th>
							<th style={{ width: '150px' }}>이메일</th>
							<th style={{ width: '150px' }}>이름</th>
							<th style={{ width: '200px' }}>주소1</th>
							<th style={{ width: '100px' }}>주소2</th>
							<th style={{ width: '100px' }}>우편번호</th>
							{/* <th style={{ width: '100px' }}>프로필</th> */}
						</tr>
					</thead>
					<tbody>
						{memberData.map(member => {
							return (
								<tr key={member.memberId}>
									<td>{member.memberId}</td>
									<td>{member.userId}</td>
									<td>{member.email}</td>
									<td>{member.userName}</td>
									<td>{member.address1}</td>
									<td>{member.address2}</td>
									<td>{member.postNo ? member.postNo : '없음'}</td>
									{/* <td>
											<img src={member.profileImg} alt={member.name} />
										</td> */}
								</tr>
							)
						})}
						{memberData.length < 1 && (
							<tr>
								<td colSpan={8}>데이터가 없습니다.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default MemberList
