import { gql } from '@apollo/client'

type memberGqlTyp = {
	page: number
	size: number
}

function GET_MEMBERLIST(pageOptions: memberGqlTyp) {
	return gql`
        query {
            getMemberList(page: ${pageOptions.page}, size: ${pageOptions.size}) {
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
}

export default {
	GET_MEMBERLIST,
}
