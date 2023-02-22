import { useEffect, useState, type FunctionComponent } from "react"
import {
	Container,
	Input,
	Heading,
	Flex,
	ScrollView,
	Divider,
	IconButton,
} from "native-base"
import Ant from "react-native-vector-icons/AntDesign"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { IClothes, setAllArticles } from "../../Store/reducers/clothes"
import { fireDB } from "../../firebase"
import { ArticleItem } from "../../components/Article"
import { getAllTypeArticles } from "../../functions/getAllTypeArticles"

export class Clothes {
	couleur: string
	image: string
	label: string
	marque: string
	note_globale: number
	prix: number
	taille: string
	type: string

	constructor(
		couleur: string,
		image: string,
		label: string,
		marque: string,
		note_globale: number,
		prix: number,
		taille: string,
		type: string
	) {
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

const HomeScreen: FunctionComponent<{ navigation: any }> = ({ navigation }) => {
	const dispatch = useAppDispatch()
	const articles = useAppSelector((state) => state.articles.articles)
	const [itemTypes, setItemTypes] = useState<string[]>([])

	const retrieveTypes = async () => {
		const types = await getAllTypeArticles()
		setItemTypes(types as string[])
	}

	const fetchAllArticles = async () => {
		const articlesResults = await fireDB.collection("articles").get()
		let tempArticles: IClothes[] = []
		articlesResults.forEach((doc) => {
			const {
				couleur,
				image,
				label,
				marque,
				note_globale,
				prix,
				taille,
				type,
			} = doc.data()
			tempArticles.push(
				new Clothes(
					couleur,
					image,
					label,
					marque,
					note_globale,
					prix,
					taille,
					type
				)
			)
		})
		dispatch(setAllArticles({ articles: tempArticles }))
	}

	useEffect(() => {
		retrieveTypes()
		fetchAllArticles()
	}, [])

	return (
		<ScrollView w="full">
			<Flex direction="row" mb="1" mt="1" justifyContent="space-evenly">
				<Input placeholder="Search" w="5/6" />
				<IconButton
					icon={<Ant name="shoppingcart" />}
					onPress={() => navigation.navigate("Cart")}
				/>
			</Flex>
			{itemTypes.map((type: string) => (
				<>
					<Divider />
					<Heading ml="8" mt="3">
						{type}
					</Heading>
					<Flex direction="row" wrap="wrap" justifyContent="space-evenly">
						{articles
							.filter((article) => article.type === type)
							.map((article: IClothes, idx: number) => (
								<ArticleItem article={article} key={idx} />
							))}
					</Flex>
				</>
			))}
		</ScrollView>
	)
}

export { HomeScreen }
