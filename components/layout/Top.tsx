import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserStateContext, UserDispatchContext, initialState } from '@/core/store/userStore'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { client } from '@/core/config/apollo'
import { LOGOUT_MEMBER } from '@/core/gql/member/memberGql'

const Top = () => {
	const router = useRouter()
	const userState = useContext(UserStateContext)
	const dispatch = useContext(UserDispatchContext)
	const [, , removeCookie] = useCookies(['userInfo'])

	const handleClickToggleMenu = () => {
		const menu = document.querySelector('.navbar__menu')
		const icons = document.querySelector('.navbar__icons')

		menu.classList.toggle('active')
		icons.classList.toggle('active')
	}

	const signOut = () => {
		client
			.mutate({
				mutation: LOGOUT_MEMBER,
			})
			.then(res => {
				if (res.data.logoutMember.success) {
					// 쿠키를 지움
					removeCookie('userInfo')

					// 스토어의 유저정보를 초기화 시킴
					dispatch({
						type: 'SET_INIT_USER',
						payload: initialState,
					})

					router.push('/')
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<nav className="navbar">
			<div className="navbar__logo">
				{/* <FontAwesomeIcon className="accusoft" icon={['fab', 'accusoft']} /> */}
				<Link href={'/'}>
					<a>
						<div>
							<img src="/static/images/logo.png" alt="logo" width="20px" />
							&nbsp;&nbsp;Jookbob2 World
						</div>
					</a>
				</Link>
			</div>

			<ul className="navbar__menu">
				<li>
					<Link href={'/'}>
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href={'/shop/shoplist'}>
						<a>Shop</a>
					</Link>
				</li>
				<li>
					<Link href={'/member/memberlist'}>
						<a>회원관리</a>
					</Link>
				</li>
			</ul>

			{userState.accessToken && (
				<div className="navbar__username">
					<span>{userState.userNm}님</span>
				</div>
			)}

			<ul className="navbar__icons">
				{userState.accessToken ? (
					<li>
						<FontAwesomeIcon icon={['fas', 'sign-out-alt']} onClick={() => signOut()} />
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

export default Top
