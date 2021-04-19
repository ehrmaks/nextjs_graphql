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
import AlertStore from '@/core/store/alertStore'
import { CookiesProvider } from 'react-cookie'
import Alert from '@/components/common/Alert'
import React, { useState } from 'react'

library.add(fas, fab)

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [alertData, setAlert] = useState<{ title?: string; msg?: string }>({
		title: '',
		msg: '',
	})
	return (
		<CookiesProvider>
			<AlertStore>
				<UserStore>
					<ApolloProvider client={client}>
						<Alert alertData={alertData} setAlert={setAlert}></Alert>
						<Top></Top>
						<div style={{ padding: '5%' }}>
							<Component {...pageProps} setAlert={setAlert} />
						</div>
						<Footer></Footer>
					</ApolloProvider>
				</UserStore>
			</AlertStore>
		</CookiesProvider>
	)
}

export default MyApp
