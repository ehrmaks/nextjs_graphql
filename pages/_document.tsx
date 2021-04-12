import Meta from '@/components/common/Meta'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}
	render() {
		return (
			<Html lang="ko">
				<Head>
					<meta charSet="utf-8" />
					<meta name="keywords" content="blog,react,antd,webpack,css,javascript" />
					{/* <link rel="manifest" href="/static/manifest.json" /> */}
					<link rel="shortcut icon" href="/static/favicon.ico" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
					{/* <meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
					/> */}
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css"
					/>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/railscasts.min.css"
					/>
				</Head>
				<Meta></Meta>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
