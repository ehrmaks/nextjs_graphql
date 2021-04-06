import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserStateContext, UserDispatchContext, initialState } from '@/core/store/userStore'
import { useCookies } from 'react-cookie'

const Header = () => {
	const userState = useContext(UserStateContext)
	const dispatch = useContext(UserDispatchContext)
	const [cookies, , removeCookie] = useCookies(['userInfo'])

	useEffect(() => {
		// 로그인 상태라면 쿠키의 정보를 스토어에 저장
		if (cookies.userInfo) dispatch({ type: 'ADD_USER', payload: cookies.userInfo })
		// 로그인 정보가 쿠키에 없다면 유저 정보 초기화
		else dispatch({ type: 'SET_INIT_USER', payload: initialState })
	}, [])

	const handleClickToggleMenu = () => {
		const menu = document.querySelector('.navbar__menu')
		const icons = document.querySelector('.navbar__icons')

		menu.classList.toggle('active')
		icons.classList.toggle('active')
	}

	const signOut = () => {
		// 쿠키를 지움
		removeCookie('userInfo')

		// 스토어의 유저정보를 초기화 시킴
		dispatch({
			type: 'SET_INIT_USER',
			payload: initialState,
		})
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
				{userState.accessToken ? (
					<li>
						<FontAwesomeIcon icon={['fas', 'sign-out-alt']} onClick={signOut} />
					</li>
				) : (
					<li>
						<Link href="/member/memberlogin">
							<a>
								<FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
							</a>
						</Link>
					</li>
				)}

				{!userState.accessToken && (
					<li>
						<Link href="/member/memberjoin">
							<a>
								<FontAwesomeIcon icon={['fas', 'user-plus']} />
							</a>
						</Link>
					</li>
				)}
			</ul>

			<a href="#" className="navbar__toogleBtn" onClick={handleClickToggleMenu}>
				<FontAwesomeIcon icon={['fas', 'bars']} className="bars" />
			</a>
		</nav>
	)
}

export default Header
