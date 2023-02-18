import { useEffect, useState, type FunctionComponent } from "react"
import { View } from "react-native"
import { Button } from "native-base"
import { Container, Text } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getNewPrice } from "../../functions/codePromo"
const HomeScreen: FunctionComponent = () => {
	const [userUid, setUserUid] = useState<string>()
	const retrieveUserUid = async () => {
		const userUid = await AsyncStorage.getItem("@TenueTrendy:userUid")
		if (userUid) setUserUid(userUid)
	}

	const deleteUid = async () => {
		const response = await AsyncStorage.removeItem("@TenueTrendy:userUid")
		console.log(response)
	}

	useEffect(() => {
		retrieveUserUid()
	}, [])

	return (
		<View>
			<Container>
				<Text>Home screen</Text>
				{userUid}
				<Button onPress={() => deleteUid()}>Sign out</Button>
				<Button
					onPress={() => {
						getNewPrice(100, "azerty")
					}}
				>
					Test code promo(console log)
				</Button>
			</Container>
		</View>
	)
}

export { HomeScreen }
