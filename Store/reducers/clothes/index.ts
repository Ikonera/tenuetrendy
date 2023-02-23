import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IClothes {
	id: string
	couleur: string
	image: string
	label: string
	marque: string
	note_globale: number
	prix: number
	taille: string
	type: string
}

interface IClothesState {
	articles: IClothes[]
}

const initialState: IClothesState = {
	articles: [],
}

const ClothesSlice = createSlice({
	name: "clothes",
	initialState,
	reducers: {
		getAllClothes: (state: IClothesState) => state,
		setAllArticles: (
			state: IClothesState,
			action: PayloadAction<{ articles: IClothes[] }>
		) => {
			return { ...state, articles: action.payload.articles }
		},
		getClothesByType: (
			state: IClothesState,
			action: PayloadAction<{ type: string }>
		) => {
			return {
				...state,
				articles: state.articles.filter(
					(article) => article.type === action.payload.type
				),
			}
		},
	},
})

export { ClothesSlice }
export const { getAllClothes, setAllArticles, getClothesByType } =
	ClothesSlice.actions
