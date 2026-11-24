import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";

import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1- load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2- if there is no authenticated user, redirect to /login page
  //*because we are using react-router-dom v6, we cannot use navigate here directly, we need to use a useEffect
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        navigate("/login");
      }
    },
    [isLoading, isAuthenticated, navigate],
  );

  //3- while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4- if there is an authenticated user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
