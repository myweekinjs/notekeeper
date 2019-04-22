/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { Component } from "react"
import MarkdownIt from "markdown-it"
import { SaveNote, UpdateNote } from "../../api/Notes"
import Firebase from "../../api/Firebase"

import { Input } from "../../elements/Forms"
import { Textarea } from "../../elements/Textarea"
import EditorSidebar from "../EditorSidebar"
import EditorActions from "../EditorActions"
import Modal from "../Modal"
import LoginForm from "../LoginForm"

import { rem } from "../../emotion/helpers"
import { Border } from "../../emotion/colours"

import {
  Grid,
  Column,
  Container
} from "../Grid"

const editorBody = `
  height: calc(100vh - 89px - 79px);
  overflow-y: auto;
`

const EditorPreview = styled.div`
  ${editorBody};
  padding: ${rem(20)};
  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 0;
  }
`

const TitleInput = `
  padding: ${rem(20)};
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${Border};
  font-size: ${rem(32)};
  line-height: normal;
  font-weight: bold;
`

const defaultMsg = '# Welcome to NoteKeeper!\n\nThis editor uses Markdown, if you are unfamiliar with it this [cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) is a great resource!\n\nClick the **Preview** button at the bottom to see what your content looks like!'

export default class Editor extends Component {

  md = new MarkdownIt()

  state = {
    editor: defaultMsg,
    preview: false,
    modal: false,
    title: '',
    post_id: null
  }

  togglePreviewState = (e) => {
    e.preventDefault()
    
    this.setState({
      preview: !this.state.preview
    })
  }

  toggleModalState = (e) => {
    if (e !== null) {
      e.preventDefault()
    }

    this.setState({
      modal: !this.state.modal
    })
  }

  changeEditorState = (e) => {
    this.setState({
      editor: e.target.value
    })
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  onSave = async (e) => {
    e.preventDefault()
    const { title, editor, post_id } = this.state

    if (title.trim() === '' || editor.trim() === '') {
      alert('Please add content to the editor and the title field')
    }

    if (post_id === null) {
      const note = await SaveNote(title, editor)
    
      if (note.id) {
        alert('Post created!')
        this.setState({
          post_id: note.id
        })
      }
    }
    else {
      UpdateNote(title, editor, post_id)
        .then(() => {
          alert('Post Updated')
        })
        .catch((e) => {
          console.error(e)
          alert(e)
        })
    }
  }

  logout = (e) => {
    e.preventDefault()
    const firebase = new Firebase()
    firebase.auth.signOut()
      .then(() => {
        this.setState({
          post_id: null,
          modal: false,
          preview: false,
          editor: defaultMsg,
          title: ''
        })
      })
      .catch((e) => {
        alert(e.message)
      })
  }

  selectNoteToEdit = (e, note) => {
    e.preventDefault()

    const {
      id,
      content,
      title
    } = note

    this.setState({
      title: title,
      editor: content,
      post_id: id
    })
  }

  createNew = (e) => {
    e.preventDefault()

    this.setState({
      title: '',
      editor: defaultMsg,
      post_id: null
    })
  }

  render() {
    let result = ""
    const {
      editor,
      preview,
      modal,
      title,
      post_id
    } = this.state

    if (preview) {
      result = this.md.render(editor)
    }

    return (
      <Container full flush>
        { modal ? <Modal title="Login" toggle={(e) => this.toggleModalState(e)}><LoginForm toggleModalState={(e) => this.toggleModalState(e)} /></Modal> : false }
        <Grid flush>
          <Column width={3} flush>
            <EditorSidebar previewAction={(e) => this.togglePreviewState(e)} previewState={preview} selectNoteToEdit={(e, note) => this.selectNoteToEdit(e, note)} />
          </Column>
          <Column width={9} flush>
            <Input placeholder="Note Title" css={css`${TitleInput}`} value={title} onChange={(e) => this.onChangeTitle(e)} />
            {
              preview ? (
                <EditorPreview dangerouslySetInnerHTML={{__html: result}} />
              ) : (
                <Textarea autoFocus css={css`${editorBody}`} value={editor} onChange={(e) => this.changeEditorState(e)} />
              )
            }
            <EditorActions modalAction={(e) => this.toggleModalState(e)} onSave={(e) => this.onSave(e)} post_id={post_id} logout={(e) => this.logout(e)} createNew={(e) => this.createNew(e)} />
          </Column>
        </Grid>
      </Container>
    )
  }
}
