import { Container, Flex, IconButton } from "native-base"
import { type FunctionComponent } from "react"
import Feather from "react-native-vector-icons/Feather"

const Header: FunctionComponent = () => {
	return (
		<Container>
			<Flex>
				<IconButton
					icon={<Feather name="shopping-cart" size={24} color="black" />}
				/>
			</Flex>
		</Container>
	)
}

export { Header }
