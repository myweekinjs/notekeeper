import Firebase from "./Firebase"

const collection = "notes"

export const SaveNote = async (title, articleContent) => {
  const firebase = new Firebase()
  const user = await firebase.getCurrentUser()
  
  try {
    const ref = firebase.firestore.collection(collection).add({
      title: title,
      content: articleContent,
      uid: user.uid,
      timestamp: firebase.app.firestore.FieldValue.serverTimestamp()
    })

    return ref
  }
  catch (e) {
    console.log(e);
    alert(e)
  }
}

export const UpdateNote = async (title, articleContent, pid) => {
  const firebase = new Firebase()

  try {
    const ref = firebase.firestore.collection(collection).doc(pid).update({
      title: title,
      content: articleContent,
      updatedAt: firebase.app.firestore.FieldValue.serverTimestamp()
    })

    return ref
  }
  catch (e) {
    console.error(e)
    alert(e)
  }
}
