
import React from "react"; // Needed if using React <17, optional for React 17+
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Header.css"; // Make sure this file exists with exact casing

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/"><strong>Employee Management System</strong></Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" className="nav-link">Employee</Nav.Link>
                    <Nav.Link as={Link} to="/employee" className="nav-link">Post-Employee</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;