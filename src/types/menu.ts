export interface RestaurantMenu {
	name: string
	imagePath: string
	id: number
	description: string
	price: number
	ingredients: Ingredient[]
	itemType: string
	category: string
	notes: string
	ranking: number
	restaurantName: string
	restaurantId: number
	visible: boolean
}

export interface Ingredient {
	name: string
	qty: number
	unit: 'bun' | 'ea' | 'lb'
	ingredientId: number | string
}
