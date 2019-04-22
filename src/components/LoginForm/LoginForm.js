/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Component } from "react"
import Firebase from "../../api/Firebase"

import { Input, Label, InputGroup, InputActions } from "../../elements/Forms"
import { Grid, Column } from "../Grid"
import { Button, SecondaryButton, ButtonGroup } from "../../elements/Button"
import { Primary, White, Black, Border } from "../../emotion/colours"

const inactiveStyled = `
  border: 1px solid ${Primary};
  color: ${Primary};
  background: ${White};
`

export default class LoginForm extends Component {
  firebase = new Firebase()

  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    login: false
  }

  toggleLoginState = (e, state) => {
    e.preventDefault()

    this.setState({
      login: state
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password, passwordConfirm, login } = this.state

    if (email === '' || password === '' || (!login && passwordConfirm === '')) {
      alert('Please fill in all the information');
    }

    if (password !== passwordConfirm) {
      alert('Passwords do not match');
    }

    if (login) {
      this.loginUser(email, password)
    }
    else {
      this.registerUser(email, password)
    }
  }

  registerUser = (email, password) => {
    this.firebase.doSetSessionPersistence()
      .then(() => {
        this.firebase.auth.createUserWithEmailAndPassword(email, password)
          .then(() => {
            this.props.toggleModalState(null)
          })
          .catch((e) => {
            console.error(e)
            alert(e.message)
          })
      })
  }

  loginUser = (email, password) => {
    this.firebase.doSetSessionPersistence()
      .then(() => {
        this.firebase.auth.signInWithEmailAndPassword(email, password)
          .then(() => {
            this.props.toggleModalState(null)
          })
          .catch((e) => {
            console.error(e)
            alert(e.message);
          })
      })
  }

  signInWithGoogle = (e) => {
    e.preventDefault()

    this.firebase.doSetSessionPersistence()
      .then(() => {
        this.firebase.doSignInWithGoogle()
          .then(() => {
            this.props.toggleModalState(null)
          })
          .catch((e) => {
            console.error(e)
            alert(e.message);
          })
      })
  }

  render() {
    const { login, email, password, passwordConfirm } = this.state
    const { toggleModalState } = this.props
    const FormButtonText = login ? "Login" : "Register"

    return (
      <Grid>
        <Column width={8}>
          <ButtonGroup>
            <Button css={css`${ login ? inactiveStyled : '' }`} onClick={(e) => this.toggleLoginState(e, false)}>Register</Button>
            <Button css={css`${ !login ? inactiveStyled : '' }`} onClick={(e) => this.toggleLoginState(e, true)}>Login</Button>
          </ButtonGroup>
          <form action="/" onSubmit={(e) => this.onSubmit(e)}>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" onChange={(e) => this.onChange(e)} value={email} />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" id="password" onChange={(e) => this.onChange(e)} value={password} />
            </InputGroup>
            { login ? (
              false
            ) : (
              <InputGroup>
                <Label htmlFor="passwordConfirm">Password Confirm</Label>
                <Input type="password" name="passwordConfirm" id="passwordConfirm" onChange={(e) => this.onChange(e)} value={passwordConfirm} />
              </InputGroup>
            )}
            <InputActions>
              <Button as="button" type="submit">{FormButtonText}</Button>
              <SecondaryButton css={css`background: ${Border}; color: ${Black}; margin-left: 0.5rem;`} onClick={(e) => toggleModalState(e)}>Close</SecondaryButton>
            </InputActions>
          </form>
        </Column>
        <Column width={4}>
          <SecondaryButton css={css`display: block; text-align: center;`} onClick={(e) => this.signInWithGoogle(e)}>Sign in with Google</SecondaryButton>
        </Column>
      </Grid>
    )
  }
}
