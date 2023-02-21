import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IClothes {
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
    articles: []
}

const ClothesSlice = createSlice({
    name: "clothes",
    initialState,
    reducers: {
        getAllClothes: (state: IClothesState, action) => state,
        setAllArticles: (state: IClothesState, action: PayloadAction<{ articles: IClothes[] }>) => {return {...state, articles: action.payload.articles}}
    }
})

export { ClothesSlice }
export const { getAllClothes, setAllArticles } = ClothesSlice.actions