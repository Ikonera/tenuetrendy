import { createSlice, PayloadAction, current } from "@reduxjs/toolkit"
import { auth } from "../../firebase"
import { User, UserCredential, UserInfo } from "firebase/auth"

interface IAuthState {
	userAccessToken: string | null
	user: null | User
}

const initialState: IAuthState = {
	userAccessToken: null,
	user: null,
}

const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authenticate: (
			state: IAuthState,
			action: PayloadAction<{ user: User }>
		) => {
			return { ...state, user: action.payload.user }
		},
		signout: (state: IAuthState, action: PayloadAction<{ user: null }>) => {
			return { ...state, user: action.payload.user }
		},
	},
})

export { AuthSlice }
export const { authenticate, signout } = AuthSlice.actions
