import { useEffect, useState, type FunctionComponent } from "react"
import { View } from "react-native"
import { Container, Text } from "native-base"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { IClothes, setAllArticles } from "../../Store/reducers/clothes"
import { fireDB } from "../../firebase"
import { Article } from "../../components/Article"

export class Clothes {
	couleur: string
    image: string
    label: string
    marque: string
    note_globale: number
    prix: number
    taille: string
    type: string

	constructor(couleur: string, image: string, label: string, marque: string, note_globale: number, prix: number, taille: string, type: string) {
		this.couleur = couleur
		this.image = image
		this.label = label
		this.marque = marque
		this.note_globale = note_globale
		this.prix = prix
		this.taille = taille
		this.type = type
	}
}

const HomeScreen: FunctionComponent = () => {
	const dispatch = useAppDispatch()
	const articles = useAppSelector(state=>state.articles.articles)

	const fetchAllArticles = async () => {
		const articlesResults = await fireDB.collection("articles").get() 
		let tempArticles: IClothes[] = []
		articlesResults.forEach(doc => {
			const { couleur, image, label, marque, note_globale, prix, taille, type } = doc.data()
			tempArticles.push(new Clothes(couleur, image, label, marque, note_globale, prix, taille, type))
		})
		dispatch(setAllArticles({ articles: tempArticles }))
	}

	useEffect(() => {
		fetchAllArticles()
	}, [])

	return (
		<View>
			<Container>
				<Text>Home screen</Text>
						<Container>
							{
					articles.map((article: IClothes, idx: number) => (
							<Article article={article} key={idx} />
						))
					}
						</Container>
			</Container>
		</View>
	)
}

export { HomeScreen }
