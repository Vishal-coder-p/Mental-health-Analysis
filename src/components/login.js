import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const clientId =
  "185678356515-ll2uchufdso91rhujsum876ivppmsnoj.apps.googleusercontent.com";

function GoogleLoginComponent() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = React.useState(null);

  const onSuccess = (response) => {
    const id_token = response.credential;
    fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: id_token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Authenticated:", data);
        navigate("/daily-log", { state: data });
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoginError("Authentication failed. Please try again.");
      });
  };

  const onFailure = (response) => {
    console.log("Login Failed:", response);
    setLoginError("Login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Login Page</h1>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
          </Col>
        </Row>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginComponent;
