import { fireDB } from "../firebase"

const getAvisByArticleId = async (articleID) => {
	return fireDB
		.collection("favori")
		.where("IDArticle", "==", articleID)
		.get()
		.then((querySnapshot) => {
			if (!querySnapshot.empty) {
				console.log(querySnapshot)
				return querySnapshot.docs
			} else {
				return 0
			}
		})
}

const addAvis = async (articleID, userID, commentaire, note) => {
	const reviewRef = db.collection("Avis")
	await reviewRef.add({
		articleID: articleID,
		userID: userID,
		commentaire: commentaire,
		note: note,
	})
}
export { getAvisByArticleId, addAvis }
