import { fireDB } from "../firebase"

const getNotesByArticleId = async (articleId) => {
	const snapshot = await fireDB
		.collection("avis")
		.where("IDArticle", "==", articleId)
		.get()
	let totalNotes = 0
	let noteCount = 0

	snapshot.forEach((doc) => {
		const note = doc.data().note
		totalNotes += note
		noteCount++
	})

	const averageNote = totalNotes / noteCount
	return averageNote
}
export { getNotesByArticleId }
