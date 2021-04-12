import { gql } from '@apollo/client'

type memberGqlTyp = {
	page: number
	size: number
}

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

// export { GET_MEMBERLIST }
