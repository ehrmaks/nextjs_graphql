import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from '@apollo/client'
// import { setContext } from '@apollo/client/link/context'
// import { onError } from '@apollo/client/link/error'

function getCookie(name) {
	//가져올 쿠키의 이름을 파라미터 값으로 받고
	let nameOfCookie = name + '=' //쿠키는 "쿠키=값" 형태로 가지고 있어서 뒤에 있는 값을 가져오기 위해 = 포함
	let x = 0
	let endOfCookie

	while (x <= document.cookie.length) {
		//현재 세션에 가지고 있는 쿠키의 총 길이를 가지고 반복
		let y = x + nameOfCookie.length //substring으로 찾아낼 쿠키의 이름 길이 저장
		if (document.cookie.substring(x, y) == nameOfCookie) {
			//잘라낸 쿠키와 쿠키의 이름이 같다면
			if ((endOfCookie = document.cookie.indexOf(';', y)) === -1)
				//y의 위치로부터 ;값까지 값이 있으면
				endOfCookie = document.cookie.length //쿠키의 길이로 적용하고
			return unescape(document.cookie.substring(y, endOfCookie)) //쿠키의 시작점과 끝점을 찾아서 값을 반환
		}

		x = document.cookie.indexOf(' ', x) + 1 //다음 쿠키를 찾기 위해 시작점을 반환

		if (x === 0)
			//쿠키 마지막이면
			break //반복문 빠져나오기
	}
	return '' //빈값 반환
}

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL + '/graphql' })

const authMiddleware = new ApolloLink((operation, forward) => {
	let token
	if (getCookie('userInfo').length > 0) {
		token = JSON.parse(getCookie('userInfo')).accessToken
	}

	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			Authorization: `Bearer ${token}`,
		},
	}))

	return forward(operation)
})

// const activityMiddleware = new ApolloLink((operation, forward) => {
// 	console.log('activity mid')
// 	// add the recent-activity custom header to the headers
// 	operation.setContext(({ headers = {} }) => ({
// 		headers: {
// 			...headers,
// 			'recent-activity': localStorage.getItem('lastOnlineTime') || null,
// 		},
// 	}))

// 	return forward(operation)
// })

// const resetToken = onError(({ graphQLErrors, networkError }) => {
// 	console.log(graphQLErrors)
// 	console.log(networkError)
// 	if (graphQLErrors)
// 		graphQLErrors.map(({ message, locations, path }) =>
// 			console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
// 		)

// 	if (networkError && networkError.name === 'ServerError') {
// 		// remove cached token on 401 from the server
// 		token = null
// 	}
// })

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([authMiddleware, httpLink]),
	credentials: 'include',
})
