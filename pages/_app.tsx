import '../styles/globals.scss'
import '../styles/header.scss'
import '../styles/footer.scss'
import { AppProps } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import TheHeader from '../components/common/theHeader'
import TheFooter from '../components/common/theFooter'
import { useRouter } from 'next/router'
import Head from 'next/head'

library.add(fas, fab)

const transPageName = pagename => {
	if (pagename) {
		const firstChar = pagename[0]
		const firstCharUpper = firstChar.toUpperCase()
		const leftChar = pagename.slice(1, pagename.length)
		return firstCharUpper + leftChar
	}
	return 'Home'
}

const MyApp = ({ Component, pageProps }: AppProps) => {
	const router = useRouter()
	const { pagename } = router.query
	const resultPageName = transPageName(pagename)

	return (
		<>
			<Head>
				<title>{resultPageName}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<TheHeader></TheHeader>
			<Component {...pageProps} />
			<TheFooter></TheFooter>
		</>
	)
}

export default MyApp
