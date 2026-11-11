import {
  cloneElement,
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

import { createPortal } from "react-dom";

import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//compound component pattern for Modal
//1-Create a Context for managing modal state
const ModalContext = createContext();

//2-Create the parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

//3-Create the child components for opening and displaying the modal
function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) }); //cloneElement lets us create a new element with additional props, ex: adding an onClick handler to a Button
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  //add the ability to close the modal when clicking outside of it
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        //if the ref.current exists and the click target is outside of it e.target, close the modal
        if (ref.current && !ref.current.contains(e.target)) {
          //console.log("Clicked outside modal");
          close();
        }
      }

      //use capture phase to ensure the click is detected before it reaches other elements, this is the 3 argument in addEventListener (true for capture phase), the other way around would be for bubbling phase and the Modal will open and close immediately
      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [close],
  );
  // end of useEffect for handling outside clicks

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

//4-Attach the compound components to the parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
