import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="main">
      <Container style={{ marginTop: 180 }}>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Quick Report</h1>
              <p className="subtitle">
                Your place to report everything you deem wrong to the
                authorities.
              </p>
            </div>
            <div className="buttonContainer">
              <Link to="login">
                <Button
                  size="lg"
                  variant="outline-primary"
                  className="landingbutton"
                >
                  Login
                </Button>
              </Link>
              <Link to="register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
