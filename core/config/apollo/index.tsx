import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

let token

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
	console.log('auth mid')
	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			// authorization: localStorage.getItem('token') || null,
			Authorization: 'Token test',
		},
	}))

	console.log(operation.getContext())

	return forward(operation)
})

const activityMiddleware = new ApolloLink((operation, forward) => {
	console.log('activity mid')
	// add the recent-activity custom header to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			'recent-activity': localStorage.getItem('lastOnlineTime') || null,
		},
	}))

	return forward(operation)
})

const resetToken = onError(({ graphQLErrors, networkError }) => {
	console.log(graphQLErrors)
	console.log(networkError)
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
		)

	if (networkError && networkError.name === 'ServerError' && networkError.statusCode === 401) {
		// remove cached token on 401 from the server
		token = null
	}
})

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([authMiddleware, activityMiddleware, resetToken, httpLink]),
	credentials: 'include',
})
