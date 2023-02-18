import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/old_cartActions"

const initialState = {
	items: [],
}

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const newItem = {
				...action.payload,
				quantity: 1,
			}
			const existingItem = state.items.find((item) => item.id === newItem.id)
			if (existingItem) {
				const updatedItems = state.items.map((item) =>
					item.id === newItem.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
				return {
					...state,
					items: updatedItems,
				}
			} else {
				return {
					...state,
					items: [...state.items, newItem],
				}
			}
		case REMOVE_FROM_CART:
			const itemToRemove = state.items.find(
				(item) => item.id === action.payload
			)
			const updatedItems = state.items.filter(
				(item) => item.id !== action.payload
			)
			return {
				...state,
				items: updatedItems,
			}
		default:
			return state
	}
}

export default cartReducer
