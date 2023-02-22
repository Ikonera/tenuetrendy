import { type FunctionComponent } from "react"
import { Container, Text, IconButton, Image, Flex, Divider } from "native-base"
import { IClothes } from "../../../Store/reducers/clothes"
import Ant from "react-native-vector-icons/AntDesign"
import Mi from "react-native-vector-icons/MaterialIcons"
import { useAppDispatch, useAppSelector } from "../../../Store/Store"
import {
	markAsFavorite,
	removeFromFavorites,
} from "../../../Store/reducers/favorites"
import { addToCart, removeFromCart } from "../../../Store/reducers/cart"

const ArticleItem: FunctionComponent<{ article: IClothes }> = ({ article }) => {
	const dispatch = useAppDispatch()
	const favArticles = useAppSelector((state) => state.favorites.articles)
	const cartArticles = useAppSelector((state) => state.cart.articles)

	const isFavArticle = (article: IClothes): boolean => {
		const articleIdx = favArticles.indexOf(article)
		if (articleIdx === -1) return false
		else return true
	}

	const isCartArticle = (article: IClothes): boolean => {
		const articleIdx = cartArticles.indexOf(article)
		if (articleIdx === -1) return false
		else return true
	}

	return (
		<Container w="32" shadow={6} my="6" bg="white">
			<Image size="xl" alt="Article image" source={{ uri: article.image }} />
			<Container pl="2">
				<Text fontSize="md">{article.label}</Text>
			</Container>
			<Flex direction="row" w="full" justifyContent="space-between" px="2">
				<Text>
					{article.taille} - {article.couleur}
				</Text>
				<Text fontWeight="medium">${article.prix}</Text>
			</Flex>
			<Flex
				w="full"
				direction="row"
				justifyContent="space-between"
				alignItems="baseline"
			>
				<Flex ml="2" direction="row" alignItems="baseline">
					<Text>{article.note_globale}</Text>
					<Ant name="star" color="yellow" />
				</Flex>
				<Flex direction="row">
					<IconButton
						onPress={() => {
							isCartArticle(article)
								? dispatch(removeFromCart({ article: article }))
								: dispatch(addToCart({ article: article }))
						}}
						icon={<Ant name="shoppingcart" color="green" />}
					/>
					<IconButton
						onPress={() => {
							isFavArticle(article)
								? dispatch(removeFromFavorites({ article: article }))
								: dispatch(markAsFavorite({ article: article }))
						}}
						icon={
							isFavArticle(article) ? (
								<Mi name="favorite" color="red" />
							) : (
								<Mi name="favorite-border" color="red" />
							)
						}
					/>
				</Flex>
			</Flex>
		</Container>
	)
}

export { ArticleItem }
