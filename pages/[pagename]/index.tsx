import React from 'react'
import { useRouter } from 'next/router'
import Bookings from './bookings'
import Faq from './faq'
import Gallery from './gallery'
import Weddings from './weddings'
import MemberJoin from './memberJoin'

const Dynamic = () => {
	const router = useRouter()
	const { pagename } = router.query
	return (
		<div>
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
			) : null}
		</div>
	)
}

export default Dynamic
