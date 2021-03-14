import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TheHeader = () => {
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
					<Link href={'/'}>Home</Link>
				</li>
				<li>
					<Link href={'/[pagename]'} as="/gallery">
						<a>Gallery</a>
					</Link>
				</li>
				<li>
					<Link href={'/[pagename]'} as="/weddings">
						<a>Weddings</a>
					</Link>
				</li>
				<li>
					<Link href={'/[pagename]'} as="/faq">
						<a>FAQ</a>
					</Link>
				</li>
				<li>
					<Link href={'/[pagename]'} as="/bookings">
						<a>Bookings</a>
					</Link>
				</li>
			</ul>

			<ul className="navbar__icons">
				<li>
					<FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
				</li>
				<li>
					<Link href="/[pagename]" as="/memberJoin">
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

export default TheHeader
