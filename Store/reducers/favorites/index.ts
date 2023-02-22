import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IClothes } from "../clothes"

interface IFavoritesState {
	articles: IClothes[]
}

const initialState: IFavoritesState = {
	articles: [],
}

const FavoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		markAsFavorite: (
			state: IFavoritesState,
			action: PayloadAction<{ article: IClothes }>
		) => {
			state.articles.push(action.payload.article)
		},
		removeFromFavorites: (
			state: IFavoritesState,
			action: PayloadAction<{ article: IClothes }>
		) => {
			const idxToRemove = state.articles.indexOf(action.payload.article)
			state.articles.splice(idxToRemove, 1)
		},
	},
})

export { FavoritesSlice }
export const { markAsFavorite, removeFromFavorites } = FavoritesSlice.actions
