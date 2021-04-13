import 'semantic-ui-css/semantic.min.css'
import '@/styles/globals.scss'
import '@/styles/header.scss'
import '@/styles/footer.scss'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/core/config/apollo'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Top from '@/components/layout/Top'
import Footer from '@components/layout/Footer'
import UserStore from '@/core/store/userStore'
import { CookiesProvider } from 'react-cookie'

library.add(fas, fab)

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<CookiesProvider>
			<UserStore>
				<ApolloProvider client={client}>
					<Top></Top>
					<div style={{ padding: '5%' }}>
						<Component {...pageProps} />
					</div>
					<Footer></Footer>
				</ApolloProvider>
			</UserStore>
		</CookiesProvider>
	)
}

export default MyApp
