import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from '../../../styles/Member.module.scss'
import memberGql from '../../../core/gql/member/memberGql'
import Head from 'next/head'

type memberGqlTyp = {
	page: number
	size: number
}

const MemberList = () => {
	const [pageOptions, setPageOption] = useState({
		page: 0,
		size: 5,
		totalPages: 0,
	})

	const handleClickPage = () => {
		pageOptions.page === 1
			? setPageOption({
					...pageOptions,
					page: 0,
			  })
			: setPageOption({
					...pageOptions,
					page: 1,
			  })
	}

	const setTotalPage = totalPages => {
		if (pageOptions.totalPages === 0) {
			setPageOption({
				...pageOptions,
				totalPages: totalPages,
			})
		}
	}

	const getMemberList = () => {
		const { loading, error, data } = useQuery(memberGql.GET_MEMBERLIST(pageOptions as memberGqlTyp), {
			variables: { pageOptions: pageOptions },
		})
		if (loading) return <p>loading...</p>
		if (error) return <p>error!</p>

		setTotalPage(data.getMemberList.totalPages)

		return (
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
			<Head>
				<title>회원 리스트</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
				/>
			</Head>
			<div className={styles.member__title}>
				<h3>회원 목록</h3>
			</div>

			{getMemberList()}
		</div>
	)
}

export default MemberList
