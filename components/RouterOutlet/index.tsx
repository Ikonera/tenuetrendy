import { FunctionComponent } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppStack } from "../NavStacks/App"

const RouterOutlet: FunctionComponent = () => {
	return (
		<NavigationContainer>
			<AppStack />
		</NavigationContainer>
	)
}

export { RouterOutlet }
