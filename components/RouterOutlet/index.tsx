import { type FunctionComponent } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppStack, AuthStack } from "../NavStacks"
import { useAppSelector } from "../../Store/Store"
import { Header } from "../Header"

const RouterOutlet: FunctionComponent = () => {
	const user = useAppSelector((state) => state.auth.user)

	return (
		<NavigationContainer>
			{user === null ? <AuthStack /> : <AppStack />}
		</NavigationContainer>
	)
}

export { RouterOutlet }
