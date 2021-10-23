import React from 'react'
import {Grid} from 'gridjs'
import {capitalizeFirst} from '../lib/helpers'
import {RestaurantMenu} from '../types/menu'
import {mockData} from '../data/menu.js'
import 'gridjs/dist/theme/mermaid.css'

export const Menu = (): JSX.Element => {
	const wrapperRef = React.useRef(null)
	const data = mockData.map((item: RestaurantMenu) => {
		const name = capitalizeFirst(item.name)
		const description = capitalizeFirst(item.description)
		const category = capitalizeFirst(item.category)
		const visible = item.visible.toString()
		return [name, item.price, category, description, visible]
	})

	const grid = new Grid({
		autoWidth: false,
		columns: ['Name', 'Price', 'Category', 'Description', 'Visible'],
		data: data,
		search: {
			enabled: true,
		},
		sort: true,
		pagination: {
			enabled: true,
			limit: 20,
			summary: true,
		},
	})

	React.useEffect(() => {
		grid.render(wrapperRef.current)
	})

	return (
		<div className="menu view">
			<div ref={wrapperRef} />
		</div>
	)
}
