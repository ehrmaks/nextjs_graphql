import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from '../../../styles/Member.module.scss'

const MemberList = () => {
	const [page, setPage] = useState(0)
	const [size, setSize] = useState(5)

	const GET_MEMBERLIST = gql`
		query {
			getMemberList(page: ${page}, size: ${size}) {
				content {
					memberNo
					userId
					email
					address1
					address2
					name
					postNo
					profileImg
				}
				totalPages
			}
		}
	`
	const handleClickPage = () => {
		page === 1 ? setPage(0) : setPage(1)
	}

	const getMemberList = () => {
		const { loading, error, data } = useQuery(GET_MEMBERLIST, {
			variables: { page: page, size: size },
		})
		if (loading) return <p>loading...</p>
		if (error) return <p>error!</p>

		const totalPages = data.getMemberList.totalPages

		return (
			<div className={styles.member__table}>
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
							<th style={{ width: '100px' }}>프로필</th>
						</tr>
					</thead>
					<tbody>
						{data.getMemberList.content.map((member, memIdx) => {
							return (
								<tr key={memIdx} onClick={handleClickPage}>
									<td>{member.memberNo}</td>
									<td>{member.userId}</td>
									<td>{member.email}</td>
									<td>{member.name}</td>
									<td>{member.address1}</td>
									<td>{member.address2}</td>
									<td>{member.postNo ? member.postNo : '없음'}</td>
									<td>
										<img src={member.profileImg} alt={member.name} />
									</td>
								</tr>
							)
						})}
						{data.getMemberList.content < 1 ? (
							<tr>
								<td colSpan={8}>데이터가 없습니다.</td>
							</tr>
						) : null}
					</tbody>
				</table>
			</div>
		)
	}
	return (
		<div className={styles.member__body}>
			<div className={styles.member__title}>
				<h3>회원 목록</h3>
			</div>
			{getMemberList()}
		</div>
	)
}

export default MemberList
