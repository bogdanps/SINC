import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";

const MainScreen = ({ title, children }) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page" style={{ marginTop: 30 }}>
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
