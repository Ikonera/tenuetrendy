import { fireDB } from "../firebase"

const getArticlesByMarqueAndTypes = async (marque, type) => {
	try {
		const articlesRef = fireDB.collection("articles")
		let query = articlesRef

		if (marque) {
			query = query.where("marque", "==", marque)
		}

		if (type) {
			query = query.where("type", "==", type)
		}

		const result = await query.get()
		const articles = []

		result.forEach((doc) => {
			articles.push(doc.data())
		})
		console.log(articles)
		return articles
	} catch (error) {
		console.error("Error getting articles by marque and type: ", error)
	}
}

export { getArticlesByMarqueAndTypes }
