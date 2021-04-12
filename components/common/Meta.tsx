import Head from 'next/head'
import React from 'react'

type MetaType = {
	title: string
	desc: string
}

export default function Meta({ title, desc }: MetaType) {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={desc} />
		</Head>
	)
}

Meta.defaultProps = {
	title: 'Home',
	desc: '홈 입니다.',
}
