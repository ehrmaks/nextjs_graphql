import Head from 'next/head'

const Home = () => {
	return (
		<div>
			<Head>
				<title>Jookbob2 World | 홈</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
				/>
				<meta name="description" content="Dev.log" />
				<meta name="keywords" content="blog,react,antd,webpack,css,javascript" />
				<link rel="shortcut icon" href="/static/favicon.ico" />
			</Head>
			<h1>홈입니다.</h1>
		</div>
	)
}

export default Home
