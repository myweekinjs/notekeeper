import styled from "@emotion/styled"
import { Border } from "../emotion/colours"
import { rem } from "../emotion/helpers"

export const ActionBar = styled.div`
  border-top: 1px solid ${Border};
  padding: ${rem(20)};
  text-align: right;
  a {
    &:not(:first-child) {
      margin-left: ${rem(8)};
    }
  }
`
