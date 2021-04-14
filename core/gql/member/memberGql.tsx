import { gql } from '@apollo/client'

export const GET_MEMBERLIST = gql`
	query getMemberList($page: Int!, $size: Int!) {
		getMemberList(page: $page, size: $size) {
			success
			code
			msg
			data {
				content {
					memberId
					userId
					email
					address1
					address2
					userName
					postNo
					profileImg
				}
				totalPages
				totalElements
				size
			}
		}
	}
`

export const LOGOUT_MEMBER = gql`
	mutation {
		logoutMember {
			code
			data
			msg
			success
		}
	}
`
