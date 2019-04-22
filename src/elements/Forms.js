import styled from "@emotion/styled"
import { Border } from "../emotion/colours"
import { rem } from "../emotion/helpers"

export const InputGroup = styled.div`
  margin-bottom: ${rem(16)};
`

export const InputActions = styled.div`
  margin-top: ${rem(21)};
  border-top: 1px solid ${Border};
  padding-top: ${rem(16)};
  text-align: right;
`

export const Label = styled.label`
  font-size: ${rem(14)};
  font-weight: bold;
  margin: 0 0 ${rem(8)};
  display: block;
`

export const Input = styled.input`
  width: 100%;
  display: block;
  border-radius: 3px;
  border: 1px solid ${Border};
  box-shadow: none;
  outline: none;
  appearance: none;
  padding: ${rem(12)} ${rem(12)};
`
