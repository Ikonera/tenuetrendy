import { type FunctionComponent } from "react"
import { Container, ScrollView, Heading, Flex, Center, Text } from "native-base"
import { useAppSelector } from "../../Store/Store"
import { IClothes } from "../../Store/reducers/clothes"
import { ArticleItem } from "../../components/Article"

const FavScreen: FunctionComponent = () => {
	const favorites = useAppSelector((state) => state.favorites.articles)

	return (
		<ScrollView w="md">
			<Container>
				<Heading ml="8" mt="3">
					Favoris
				</Heading>
				<Flex
					w="full"
					direction="row"
					wrap="wrap"
					justifyContent="space-evenly"
				>
					{favorites.map((article: IClothes, idx: number) => (
						<ArticleItem article={article} key={idx} />
					))}
					{favorites.length < 1 && (
						<Center mt="4">
							<Text>Vous n'avez pas d'article dans vos favoris.</Text>
						</Center>
					)}
				</Flex>
			</Container>
		</ScrollView>
	)
}

export { FavScreen }
