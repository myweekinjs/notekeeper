/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { Black, Border, White } from "../../emotion/colours"
import { rem } from "../../emotion/helpers"
import { SmallContainerSize } from "../../emotion/variables"

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${Black};
  opacity: 0.9;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`

const ModalBox = styled.div`
  padding: ${rem(20)};
  background: ${White};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: ${rem(SmallContainerSize)};
  transform: translate(-50%, -50%);
  border-radius: 3px;
  > h3 {
    margin: 0;
    padding: 0 0 ${rem(15)};
    border-bottom: 1px solid ${Border};
  }
`

const ModalContent = styled.div`
  padding: ${rem(20)} 0 0;
`

const Modal = ({
  title,
  children,
  toggle
}) => {
  return (
    <ModalWrapper>
      <Overlay onClick={(e) => toggle(e)} />
      <ModalBox>
        <h3>{title}</h3>
        <ModalContent>
          { children }
        </ModalContent>
      </ModalBox>
    </ModalWrapper>
  )
}

export default Modal
