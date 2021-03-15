import React from 'react'
import { useRouter } from 'next/router'
import Bookings from '../bookings/bookings'
import Faq from '../faq/faq'
import Gallery from '../gallery/gallery'
import Weddings from '../weddings/weddings'
import MemberJoin from '../member/memberJoin/memberJoin'
import MemberList from '../member/memberList/memberList'
import Head from 'next/head'

const transPageName = (pagename: string) => {
	if (pagename) {
		const firstChar = pagename[0]
		const firstCharUpper = firstChar.toUpperCase()
		const leftChar = pagename.slice(1, pagename.length)
		return firstCharUpper + leftChar
	}
	return 'Home'
}

const Dynamic = () => {
	const router = useRouter()

	const { pagename } = router.query
	const resultPageName = transPageName(pagename as string)

	return (
		<div>
			<Head>
				<title>Jookbob2 World | {resultPageName}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{pagename === 'faq' ? (
				<Faq></Faq>
			) : pagename === 'bookings' ? (
				<Bookings></Bookings>
			) : pagename === 'gallery' ? (
				<Gallery></Gallery>
			) : pagename === 'weddings' ? (
				<Weddings></Weddings>
			) : pagename === 'memberJoin' ? (
				<MemberJoin></MemberJoin>
			) : pagename === 'memberList' ? (
				<MemberList></MemberList>
			) : null}
		</div>
	)
}

export default Dynamic
