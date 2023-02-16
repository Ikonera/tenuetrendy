import { type FunctionComponent } from "react"
import { View } from "react-native"
import { Container, Text } from "native-base"

const HomeScreen: FunctionComponent = () => {
	return (
		<View>
			<Container>
				<Text>Home screen</Text>
			</Container>
		</View>
	)
}

export { HomeScreen }
