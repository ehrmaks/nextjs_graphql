import '../styles/globals.scss'
import '../styles/header.scss'
import '../styles/footer.scss'
import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'

library.add(fas, fab)

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_API_URL,
	cache: new InMemoryCache(),
	credentials: 'same-origin',
})

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ApolloProvider client={client}>
			<Header></Header>
			<Component {...pageProps} />
			<Footer></Footer>
		</ApolloProvider>
	)
}

export default MyApp
