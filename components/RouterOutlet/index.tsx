import { type FunctionComponent } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppStack, AuthStack } from "../NavStacks"
import AsyncStorage from "@react-native-async-storage/async-storage"

const RouterOutlet: FunctionComponent = () => {
	const userUid = AsyncStorage.getItem("@TenueTrendy:userUid").then(
		(userUid) => userUid
	)

	return (
		<NavigationContainer>
			{userUid !== null ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	)
}

export { RouterOutlet }
