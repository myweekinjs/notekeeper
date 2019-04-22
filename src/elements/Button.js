import styled from "@emotion/styled"
import { Secondary, Primary, White } from "../emotion/colours"
import { rem } from "../emotion/helpers"

export const Button = styled.a`
  display: inline-block;
  font-size: ${rem(16)};
  margin: 0;
  text-decoration: none;
  border: none;
  appearance: none;
  font-weight: bold;
  padding: ${rem(15)} ${rem(24)};
  color: ${White};
  background: ${Primary};
  cursor: pointer;
  border-radius: 3px;
`

export const SecondaryButton = styled(Button)`
  background: ${Secondary};
`

export const LinkButton = styled.a`
  text-decoration: none;
  color: ${Primary};
  text-transform: uppercase;
  font-size: ${rem(14)};
  cursor: pointer;
`

export const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: ${rem(24)};
  > a,
  > button {
    width: 100%;
    text-align: center;
    border-radius: 0;
    &:first-of-type {
      border-radius: 3px 0 0 3px;
    }
    &:last-of-type {
      border-radius: 0 3px 3px 0;
    }
  }
`
