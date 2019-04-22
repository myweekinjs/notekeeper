/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"

import AppContext from "../../store/AppContext"

import { rem } from "../../emotion/helpers"
import { Border } from "../../emotion/colours"

import Loading from "../../elements/Loading"
import { ActionBar } from "../../elements/ActionBar"
import { SecondaryButton } from "../../elements/Button"
import { LoginAccessText } from "../../elements/Typography"

import NotesListing from "../NotesListing"

const Sidebar = styled.div`
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid ${Border};
  padding: ${rem(20)} 0 0;
  display: flex;
  flex-direction: column;
  h1 {
    margin: 0 0 ${rem(20)};
    padding: 0 ${rem(20)} ${rem(20)};
    border-bottom: 1px solid ${Border};
  }
  h1 + div {
    flex-grow: 2;
    padding: 0 ${rem(20)} ${rem(20)};
    overflow-y: auto;
  }
`

const EditorSidebar = ({
  previewAction,
  previewState,
  selectNoteToEdit
}) => {
  const previewButtonText = previewState ? "Edit" : "Preview"

  return (
    <Sidebar>
      <h1>NoteKeeper</h1>
      <div>
        <AppContext.Consumer>
          {context => (
            context.loading ? (
              <Loading />
            ) : (
              context.user ? (
                <NotesListing selectNoteToEdit={(e, note) => selectNoteToEdit(e, note)} />
              ) : (
                <LoginAccessText>Login to see the goodies!</LoginAccessText>
              )
            )
          )}
        </AppContext.Consumer>
      </div>
      <ActionBar>
        <SecondaryButton onClick={(e) => previewAction(e)}>{previewButtonText}</SecondaryButton>
      </ActionBar>
    </Sidebar>
  )
}

export default EditorSidebar
