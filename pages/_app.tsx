import '@/styles/globals.scss'
import '@/styles/header.scss'
import '@/styles/footer.scss'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/core/config/apollo'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Header from '@components/layout/header'
import Footer from '@components/layout/footer'
import UserStore from '@/core/store/users'

library.add(fas, fab)

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ApolloProvider client={client}>
			<UserStore>
				<Header></Header>
				<Component {...pageProps} />
				<Footer></Footer>
			</UserStore>
		</ApolloProvider>
	)
}

export default MyApp
