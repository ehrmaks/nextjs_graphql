import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
	const handleClickToggleMenu = () => {
		const menu = document.querySelector('.navbar__menu')
		const icons = document.querySelector('.navbar__icons')

		menu.classList.toggle('active')
		icons.classList.toggle('active')
	}

	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<FontAwesomeIcon className="accusoft" icon={['fab', 'accusoft']} />
				<Link href={'/'}>Jookbob2 World</Link>
			</div>

			<ul className="navbar__menu">
				<li>
					<Link href={'/'}>
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href={'/gallery/gallerylist'}>
						<a>Gallery</a>
					</Link>
				</li>
				<li>
					<Link href={'/weddings/weddingslist'}>
						<a>Weddings</a>
					</Link>
				</li>
				<li>
					<Link href={'/faq/faqlist'}>
						<a>FAQ</a>
					</Link>
				</li>
				<li>
					<Link href={'/bookings/bookingslist'}>
						<a>Bookings</a>
					</Link>
				</li>
				<li>
					<Link href={'/member/memberlist'}>
						<a>회원관리</a>
					</Link>
				</li>
			</ul>

			<ul className="navbar__icons">
				<li>
					<Link href="/member/memberlogin">
						<a>
							<FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
						</a>
					</Link>
				</li>
				<li>
					<Link href="/member/memberjoin">
						<a>
							<FontAwesomeIcon icon={['fas', 'user-plus']} />
						</a>
					</Link>
				</li>
			</ul>

			<a href="#" className="navbar__toogleBtn" onClick={handleClickToggleMenu}>
				<FontAwesomeIcon icon={['fas', 'bars']} className="bars" />
			</a>
		</nav>
	)
}

export default Header
