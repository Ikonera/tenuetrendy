import { configureStore, combineReducers } from "redux"
import cartReducer from "./reducers/old_cartReducers"

const rootReducer = combineReducers({
	cart: cartReducer,
})

const store = configureStore(rootReducer)

export default store
