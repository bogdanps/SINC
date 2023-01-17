import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../MainScreen";
import axios from "axios";

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: [],
            categories: [],
            loaded: false,
        };
    }

    componentDidMount() {
        axios
            .request({
                url: "/api/reports/getReport",
                method: "get",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("userInfo")}`,
                },
            })
            .then((response) =>
                this.setState({
                    titles: response.data.map((report) => report.title),
                    categories: response.data.map((report) => report.category),
                })
            )
            .then(() => this.setState({ loaded: true }));
    }
    render() {
        const { titles, categories, loaded } = this.state;
        return loaded ? (
            <div>
                <ul>
                    {titles.map((title) => {
                        return (
                            <div>
                                <Button
                                    variant="outline-danger"
                                    className="mx-2"
                                    size="sm"
                                    style={{
                                        float: "right",
                                    }}
                                >
                                    Delete
                                </Button>
                                <li
                                    key={title}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                        flex: 1,
                                        alignSelf: "center",
                                        fontSize: 16,
                                        listStyleType: "none",
                                        height: 35,
                                        marginBottom: 15,
                                    }}
                                >
                                    {title}
                                </li>
                            </div>
                        );
                    })}
                </ul>
            </div>
        ) : (
            <div>Loading...</div>
        );
    }
}

const ReportingPage = () => {
    return (
        <MainScreen title="Reporting Dashboard" style={{ marginTop: 40 }}>
            <Link to="createReport">
                <Button
                    style={{ marginLeft: 10, marginBottom: 6, marginTop: 10 }}
                >
                    Report an Event
                </Button>
                <h2 style={{ marginLeft: 10, marginTop: 30, marginBottom: 10 }}>
                    Ongoing Reports
                </h2>
                <Card style={{ margin: 10 }}>
                    <Card.Header style={{ display: "flex" }}>
                        <span
                            style={{
                                color: "black",
                                textDecoration: "none",
                                flex: 1,
                                cursor: "pointer",
                                alignSelf: "center",
                                fontSize: 18,
                            }}
                        >
                            <Reports></Reports>
                        </span>
                    </Card.Header>
                </Card>
            </Link>
        </MainScreen>
    );
};

export default ReportingPage;
