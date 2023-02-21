import { useEffect, useState, type FunctionComponent } from "react"
import { View } from "react-native"
import { Button } from "native-base"
import { Container, Text } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getNewPrice } from "../../functions/codePromo"
import { signout } from "../../Store/reducers/auth"
import { useAppDispatch, useAppSelector } from "../../Store/Store"

const HomeScreen: FunctionComponent = () => {
	const user = useAppSelector(state=>state.auth.user)
	const dispatch = useAppDispatch()

	return (
		<View>
			<Container>
				<Text>Home screen</Text>
				<Button onPress={() => dispatch(signout({ user: null }))}>Sign out</Button>
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
