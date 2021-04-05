import { gql } from '@apollo/client'

type memberGqlTyp = {
	page: number
	size: number
}

function GET_MEMBERLIST(pageOptions: memberGqlTyp) {
	return gql`
        query {
            getUserList(page: ${pageOptions.page}, size: ${pageOptions.size}) {
                success
                code
                msg
                data {
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
