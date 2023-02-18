import { fireDB } from "../firebase"

const getAllMarqueArticles = async () => {
	try {
		const result = await fireDB.collection("articles").get()
		const uniqueMarque = []
		result.forEach((doc) => {
			const marque = doc.data().marque
			if (!uniqueMarque.includes(marque)) {
				uniqueMarque.push(marque)
			}
		})
		console.log("Marques:", uniqueMarque)
		return uniqueMarque
	} catch (error) {
		console.error("Error getting types: ", error)
	}
}

export { getAllMarqueArticles }
