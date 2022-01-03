export interface MenuItem {
	name?: string
	imagePath?: string
	id?: string
	description?: string
	price?: number
	ingredients?: Ingredient[]
	itemType?: string
	category?: string
	notes?: string
	ranking?: number
	restaurantName?: string
	restaurantId?: string
	visible?: boolean
	image?:string 
}

export interface Ingredient {
	name?: string
	qty?: number
	unit?: 'bun' | 'ea' | 'lb'
	ingredientId?: number | string
}
