import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../MainScreen";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setMessage("Passwords do not match");
        } else {
            setMessage(null);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                setLoading(true);
                const { data } = await axios.post(
                    "/api/users",
                    { name, email, password },
                    config
                );

                console.log(data);
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
                navigate("/login");
            } catch (error) {
                setError(error.response.data.message);
                setLoading(false);
            }
        }
    };

    return (
        <MainScreen title="REGISTER">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && (
                    <ErrorMessage variant="danger">{message}</ErrorMessage>
                )}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ marginTop: 20 }}>
                            Email address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{ marginTop: 20 }}>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label style={{ marginTop: 20 }}>
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        style={{ marginTop: 20 }}
                    >
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="../login">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
};

export default RegisterScreen;
