import {
	ScrollView,
	Flex,
	Center,
	Text,
	Modal,
	Divider,
	Button,
	Input,
} from "native-base"
import { useEffect, useState, type FunctionComponent } from "react"
import { IClothes } from "../../Store/reducers/clothes"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { ArticleItem } from "../../components/Article"
import { removeArticlesFromCart } from "../../Store/reducers/cart"
import Ant from "react-native-vector-icons/AntDesign"
import { getNewPrice } from "../../functions/codePromo"

const CartScreen: FunctionComponent = () => {
	const dispatch = useAppDispatch()
	const articles = useAppSelector((state) => state.cart.articles)
	const [initialCartPrice, setInitialCartPrice] = useState<number>(0)
	const [totalCartPrice, setTotalCartPrice] = useState<number>(0)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const toggleModal = () => setOpenModal(!openModal)

	const handleCodeChange = async (code: string) => {
		if (code !== "") {
			const newPrice = await getNewPrice(totalCartPrice, code)
			setTotalCartPrice(newPrice)
		} else setTotalCartPrice(initialCartPrice)
	}

	useEffect(() => {
		let initialCartPrice = articles.map((article) => article.prix)
		if (articles.length > 0) {
			let total = initialCartPrice.reduce(
				(acc, p) => Number(acc) + Number(p),
				0
			)
			setInitialCartPrice(total)
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
				<Center>
					<Divider />
					<Text>Prix total de la commande : {totalCartPrice}</Text>
					<Input
						w="4/6"
						my="3"
						placeholder="Code promo"
						onChangeText={(newText: string) => handleCodeChange(newText)}
					/>
					<Button
						w="4/6"
						mb="10"
						onPress={() => {
							dispatch(removeArticlesFromCart())
							setOpenModal(true)
						}}
					>
						<Text>Payer ${totalCartPrice}</Text>
					</Button>
				</Center>
			)}

			{openModal && (
				<Modal isOpen={openModal} onClose={() => toggleModal()}>
					<Modal.Content>
						<Modal.CloseButton />
						<Modal.Header>Paiement accept??</Modal.Header>
						<Modal.Body>
							<Center>
								<Ant name="check" color="green" />
							</Center>
						</Modal.Body>
					</Modal.Content>
				</Modal>
			)}
		</ScrollView>
	)
}

export { CartScreen }
