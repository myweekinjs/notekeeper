import styled from '@emotion/styled'
import { Grey } from "../emotion/colours"
import { rem } from "../emotion/helpers"

export const Text = styled.p`
  color: red;
`

export const LoginAccessText = styled.p`
  color: ${Grey};
  font-size: ${rem(21)};
  font-weight: bold;
  margin: 0;
`