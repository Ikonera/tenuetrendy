import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { type FunctionComponent } from "react"
import { FormLogin } from "../../../Screens"

const Stack = createNativeStackNavigator()

const AuthStack: FunctionComponent = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Login"
				component={FormLogin}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}

export { AuthStack }
