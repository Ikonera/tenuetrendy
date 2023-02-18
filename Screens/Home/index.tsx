import { useEffect, useState, type FunctionComponent } from "react"
import { View } from "react-native"
import { Button } from "native-base"
import { Container, Text } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAllTypeArticles } from "../../functions/getAllTypeArticles"
import { getAllMarqueArticles } from "../../functions/getAllMarqueArticles"
import { getArticlesByMarqueAndTypes } from "../../functions/getArticlesByMarqueAndTypes"

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
				</Button>
			</Container>
		</View>
	)
}

export { HomeScreen }
