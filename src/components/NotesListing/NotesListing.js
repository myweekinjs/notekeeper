import React, { useState, useEffect, useContext } from "react"
import styled from "@emotion/styled"
import AppContext from "../../store/AppContext"
import Firebase from "../../api/Firebase"

import Loading from "../../elements/Loading"
import { LoginAccessText } from "../../elements/Typography"
import { LinkButton } from "../../elements/Button"

import { Border } from "../../emotion/colours"
import { rem } from "../../emotion/helpers"

const Card = styled.div`
  padding: ${rem(15)};
  border: 1px solid ${Border};
  margin-bottom: ${rem(8)};
  border-radius: 3px;
  h4 {
    margin-top: 0;
    margin-bottom: ${rem(8)};
  }
`

const NotesListing = ({
  selectNoteToEdit
}) => {
  const appContext = useContext(AppContext);
  const [notes, setNotes] = useState(null)
  const [loading, setLoading] = useState(true)
  const firebase = new Firebase()
  let unsubscribe = null

  useEffect(() => {
    function addNotesData(snap) {
      console.log('Snap', snap)
      let data = [];
      snap.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id
        })
      })

      setNotes(data)
      setLoading(false)
    }

    const uid = appContext.user.uid
    
    unsubscribe = firebase.firestore.collection("notes").where("uid", "==", uid).onSnapshot((snap) => {
      addNotesData(snap)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const ListNotes = () => {
    if (notes && notes.length > 0) {
      console.log(notes)
      return notes.map((note) => {
        return (
          <Card key={note.id}>
            <h4>{note.title}</h4>
            <LinkButton onClick={(e) => selectNoteToEdit(e, note)}>Edit</LinkButton>
          </Card>
        )
      })
    }
  }

  return (
    loading ? (
      <Loading />
    ) : (
      notes && notes.length > 0 ? (
        ListNotes()
      ) : (
        <LoginAccessText>No Notes Found</LoginAccessText>
      )
    )
  )
}

export default NotesListing
