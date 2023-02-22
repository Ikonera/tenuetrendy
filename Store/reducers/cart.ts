import { createSlice } from "@reduxjs/toolkit"
import { IClothes } from "./clothes"

interface ICartState {
	articles: IClothes[]
}

const initialState: ICartState = {
	articles: [],
}

const CartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.articles.push(action.payload.article)
		},
		removeFromCart: (state, action) => {
			let idxArticleToRemove = state.articles.indexOf(action.payload.article)
			state.articles.splice(idxArticleToRemove, 1)
		},
		removeArticlesFromCart: (state) => {
			return { ...state, articles: [] }
		},
	},
})

export { CartSlice }
export const { addToCart, removeFromCart, removeArticlesFromCart } =
	CartSlice.actions
