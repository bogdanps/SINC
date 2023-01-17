import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainScreen from "../MainScreen";

const CreateReportPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };
    let navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();

        axios.request({
            url: "/api/reports/registerReport",
            method: "post",
            headers: {
                authorization: `Bearer ${localStorage.getItem("userInfo")}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                title: title,
                content: content,
                category: category.toLowerCase(),
            }),
        });
        resetHandler();
        navigate("/reporting");
    };
    return (
        <MainScreen title="Submit your event">
            <Form onSubmit={submitHandler}>
                <Form.Group className="m-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give the event a title"
                    />
                </Form.Group>

                <Form.Group className="m-3" controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Please describe the event"
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mx-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>Select a catagory</option>
                        <option value="rutier">Rutier</option>
                        <option value="salubritate">Salubritate</option>
                        <option value="siguranta">Siguranta</option>
                        <option value="administrativ">Administrativ</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </MainScreen>
    );
};

export default CreateReportPage;
