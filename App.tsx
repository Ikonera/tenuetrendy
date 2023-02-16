import React from "react"
import { View } from "react-native"

import { fireDB, auth } from "./firebase"
import clothes from "./vetements.json"
import user from "./user.json"

import { NativeBaseProvider, Text, Button } from "native-base"
import { RouterOutlet } from "./components/RouterOutlet"

function App(): JSX.Element {
	const createCollection = () => {
		clothes.forEach(async (article) => {
			const response = await fireDB.collection("articles").add(article)
			console.log(response)
		})

		user.forEach(async (user) => {
			await fireDB.collection("users").add(user)
		})
	}

	const createCollectionUser = () => {
		user.forEach(async (user) => {
			await fireDB.collection("users").add(user)
		})
	}

	const createCollectionAvis = async () => {
		const IdsArticles = await getIdsCollection("articles")
		const IdsUsers = await getIdsCollection("users")

		IdsArticles.forEach((article) => {
			IdsUsers.forEach((user) => {
				let RandomNumber = Math.floor(Math.random() * 5) + 1
				let phrase = "Super article !"
				let id_article = article.id
				let id_user = user.id
				fireDB.collection("avis").add({
					IDUser: id_user,
					IDArticle: id_article,
					avis: phrase,
					note: RandomNumber,
				})
			})
		})
	}

	const createCollectionFavori = async () => {
		const IdsArticles = await getIdsCollection("articles")
		const IdsUsers = await getIdsCollection("users")

		IdsUsers.forEach((user) => {
			let RandomNumber = Math.floor(Math.random() * 15) + 1
			let RandomNumber2 = Math.floor(Math.random() * 15) + 1

			let article1 = IdsArticles[RandomNumber]
			let article2 = IdsArticles[RandomNumber2]

			fireDB.collection("favori").add({
				IDUser: user.id,
				IDArticles: [article1, article2],
			})
		})
	}

	const getIdsCollection = async (collectionName: string) => {
		const test = await fireDB
			.collection(collectionName)
			.get()
			.then((data) => {
				const temp = data.docs.map((doc) => {
					return { id: doc.id }
				})
				return temp
			})
		return test
	}

	return (
		<NativeBaseProvider>
			<RouterOutlet />
		</NativeBaseProvider>
	)
}

export default App
