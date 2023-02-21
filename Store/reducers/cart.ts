import { createSlice } from "@reduxjs/toolkit";

interface ICartState {
    articles: any[]
}

const initialState: ICartState = {
    articles: []
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.articles.push(action.payload.article)
        },
        removeFromCart: (state,  action) => {
            let idxArticleToRemove = state.articles.indexOf(action.payload.article)
            state.articles.splice(idxArticleToRemove, 1)
        },
    }
})

export { CartSlice }