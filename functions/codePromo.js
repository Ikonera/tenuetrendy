import { fireDB } from "../firebase"

const calculCodePromo = (price, pourcentagePromo) => {
	if (pourcentagePromo === 0 || price === 0) {
		console.log("Prix ou Promo nul")
		return price
	}

	return (priceWithPromo = price * (1 - pourcentagePromo / 100))
}

const getPourcentageByCode = (code) => {
	return fireDB
		.collection("codesPromo")
		.where("code", "==", code)
		.get()
		.then((querySnapshot) => {
			if (!querySnapshot.empty) {
				const document = querySnapshot.docs[0].data()
				console.log(document.pourcentage)
				return document.pourcentage
			} else {
				return 0
			}
		})
}

const getNewPrice = async (price, code) => {
	if (price === 0 || code === "") {
		return price
	}
	let pourcentage = await getPourcentageByCode(code)
	console.log("newPrice:", calculCodePromo(price, pourcentage))
	return calculCodePromo(price, pourcentage)
}
export { getNewPrice }
