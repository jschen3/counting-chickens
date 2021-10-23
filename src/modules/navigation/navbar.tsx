import React from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import {sidebarData} from './sidebar-data'
import {APP_NAME} from '../../lib/constants'
import './styles.css'

const convertIcon = (icon: string): JSX.Element => {
	switch (icon) {
		case 'fa-menu':
			return <FaIcons.FaListAlt />
		case 'fa-plus':
			return <FaIcons.FaPlus />
		default:
			return <FaIcons.FaQuestion />
	}
}

export const Navbar = (): JSX.Element => {
	return (
		<>
			<div className="navbar" />

			<nav className="nav-menu active">
				<ul className="nav-menu-items">
					<li className="navbar-spacer">
						<h1>{APP_NAME}</h1>
					</li>

					{sidebarData.map((item, index) => {
						return (
							<li key={index} className={item.class}>
								<Link to={item.path}>
									{convertIcon(item.icon)}
									<span>{item.title}</span>
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
		</>
	)
}
