import { type FunctionComponent } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppStack, AuthStack } from "../NavStacks"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAppSelector } from "../../Store/Store"


const RouterOutlet: FunctionComponent = () => {
	const user = useAppSelector(state => state.auth.user)

	return (
		<NavigationContainer>
			{user !== null ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	)
}

export { RouterOutlet }
