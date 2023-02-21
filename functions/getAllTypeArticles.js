import { fireDB } from "../firebase"

const getAllTypeArticles = async () => {
	try {
		const result = await fireDB.collection("articles").get()
		const uniqueTypes = []
		result.forEach((doc) => {
			const type = doc.data().type
			if (!uniqueTypes.includes(type)) {
				uniqueTypes.push(type)
			}
		})
		console.log("Types:", uniqueTypes)
		return uniqueTypes
	} catch (error) {
		console.error("Error getting types: ", error)
	}
}

export { getAllTypeArticles }
