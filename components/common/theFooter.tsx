import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TheFooter = () => {
	return (
		<footer className="footer__main">
			<ul className="footer__icons">
				<li>
					<FontAwesomeIcon icon={['fab', 'twitter']} />
				</li>
				<li>
					<FontAwesomeIcon icon={['fab', 'facebook']} />
				</li>
			</ul>
			<ul className="footer__utility">
				<li>
					<a href="#">Infoㆍ</a>
				</li>
				<li>
					<a href="#">Supportㆍ</a>
				</li>
				<li>
					<a href="#">Marketing</a>
				</li>
			</ul>
			<ul className="footer__utility2">
				<li>
					<a href="#">Terms of Useㆍ</a>
				</li>
				<li>
					<a href="#">Privacy Police</a>
				</li>
			</ul>
			<div className="footer__source">
				<p>@ 2021 Jookbob2 World</p>
			</div>
		</footer>
	)
}

export default TheFooter
