import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  //add the ability to close the modal when clicking outside of it
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        //if the ref.current exists and the click target is outside of it e.target, close the modal
        if (ref.current && !ref.current.contains(e.target)) {
          //console.log("Clicked outside modal");
          handler();
        }
      }

      //use capture phase to ensure the click is detected before it reaches other elements, this is the 3 argument in addEventListener (true for capture phase), the other way around would be for bubbling phase and the Modal will open and close immediately
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
  // end of useEffect for handling outside clicks
}
