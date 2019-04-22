/** @jsx jsx */
import { jsx, css } from "@emotion/core"
// eslint-disable-next-line no-unused-vars
import React from "react"

import AppContext from "../../store/AppContext"

import { Button, LinkButton } from "../../elements/Button"
import { ActionBar } from "../../elements/ActionBar"
import { Border, Black } from "../../emotion/colours"
import Loading from "../../elements/Loading"

const EditorActions = ({
  modalAction,
  onSave,
  post_id,
  logout,
  createNew
}) => {

  return (
    <ActionBar css={css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `}>
      <AppContext.Consumer>
        {context => (
            context.loading ? (
              <Loading styles={`text-align: right;`} />
            ) : (
              context.user ? (
                <>
                  { post_id ? <div css={css`flex-grow: 2; text-align: left;`}><LinkButton onClick={(e) => createNew(e)}>New</LinkButton></div> : false }
                  <Button onClick={(e) => onSave(e)}>
                    { post_id ? 'Update' : 'Save' }
                  </Button>
                  <Button css={css`background: ${Border}; color: ${Black};`} onClick={(e) => logout(e)}>Logout</Button>
                </>
              ) : (
                <Button onClick={(e) => modalAction(e)}>Login</Button>
              )
            )
          )}
      </AppContext.Consumer>
    </ActionBar>
  )
}

export default EditorActions
