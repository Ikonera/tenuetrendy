import { useEffect, useState, type FunctionComponent } from "react"
import { View } from "react-native"
import { Button } from "native-base"
import { Container, Text } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { getAllTypeArticles } from "../../functions/getAllTypeArticles"
import { getAllMarqueArticles } from "../../functions/getAllMarqueArticles"
import { getArticlesByMarqueAndTypes } from "../../functions/getArticlesByMarqueAndTypes"
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

				<Button onPress={() => getAllTypeArticles()}>getAllTypeArticles</Button>
				<Button onPress={() => getAllMarqueArticles()}>
					getAllTypeArticles
				</Button>

				<Button onPress={() => getArticlesByMarqueAndTypes("H&M", "jeans")}>
					getArticlesByMarqueAndTypes marque H&M, type jeans
				</Button>

				<Button onPress={() => getArticlesByMarqueAndTypes("", "jeans")}>
					getArticlesByMarqueAndTypes marque vide, type jeans
				</Button>

				<Button onPress={() => getArticlesByMarqueAndTypes("H&M", "")}>
					getArticlesByMarqueAndTypes marque H&M, type vide
				</Button>

				<Button onPress={() => getArticlesByMarqueAndTypes("", "")}>
					getArticlesByMarqueAndTypes marque vide, type vide

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
