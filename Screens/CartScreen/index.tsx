import { ScrollView, Flex, Center, Text, Container, Divider, Button } from "native-base"
import { useEffect, useState, type FunctionComponent } from "react"
import { IClothes } from "../../Store/reducers/clothes"
import { useAppSelector } from "../../Store/Store"
import { ArticleItem } from "../../components/Article"

const CartScreen: FunctionComponent = () => {
	const articles = useAppSelector((state) => state.cart.articles)
	const [totalCartPrice, setTotalCartPrice] = useState<number>(0)

	useEffect(() => {
		let price = articles.map((article) => article.prix)
		if (articles.length > 0) {
			let total = price.reduce((acc, p) => acc + p)
			setTotalCartPrice(total)
		}
	}, [articles.length])

	return (
		<ScrollView>
			<Flex direction="row" wrap="wrap" justifyContent="space-evenly">
				{articles.map((article: IClothes, idx: number) => (
					<ArticleItem article={article} key={idx} />
				))}
				{articles.length < 1 && (
					<Center mt="4">
						<Text>Vous n'avez pas d'article dans votre panier.</Text>
					</Center>
				)}
			</Flex>
			{articles.length > 0 && (
				<Container>
					<Divider />
					<Text>Prix total de la commande : {totalCartPrice}</Text>
					<Button onPress={() => }>Payer ${totalCartPrice}</Button>
				</Container>
			)}
		</ScrollView>
	)
}

export { CartScreen }
