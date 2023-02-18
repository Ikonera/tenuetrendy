import { fireDB } from "../firebase"

const getFavoriByUserID = (userID) => {
	return fireDB
		.collection("favori")
		.where("IDUser", "==", userID)
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

const addFavori = async (articleId, userID) => {
	const favoriteRef = db.collection("favori").where("IDUser", "==", userID)
	const favoriteSnapshot = await favoriteRef.get()

	if (favoriteSnapshot.empty) {
		await db.collection("favori").add({
			IDUser: userID,
			IDArticles: [articleID],
		})
	} else {
		const favoriteDoc = favoriteSnapshot.docs[0]
		const favoriteData = favoriteDoc.data()
		const articleIDs = favoriteData.IDArticles

		if (!articleIDs.includes(articleID)) {
			articleIDs.push(articleID)
			await favoriteDoc.update({ IDArticles: articleIDs })
		}
	}
}
export { getFavoriByUserID, addFavori }
