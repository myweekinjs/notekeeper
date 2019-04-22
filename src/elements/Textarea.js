import styled from '@emotion/styled'

import { Black } from "../emotion/colours"
import { rem } from "../emotion/helpers"

export const Textarea = styled.textarea`
  outline: none;
  resize: none;
  width: 100%;
  margin: 0;
  padding: ${rem(20)};
  border: none;
  appearance: none;
  font-size: 1.25rem;
  color: ${Black};
  display: block;
`
