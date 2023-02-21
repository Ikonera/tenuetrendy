import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AuthSlice } from "./reducers"
import { CartSlice } from "./reducers/cart"
import { ClothesSlice } from "./reducers/clothes"

const GlobalStore = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        cart: CartSlice.reducer,
        articles: ClothesSlice.reducer,
    }
})

export { GlobalStore }
export const useAppDispatch: () => typeof GlobalStore.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof GlobalStore.getState>> = useSelector