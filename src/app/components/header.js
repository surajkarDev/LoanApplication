"use client";

import React from "react";
import Link from "next/link";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/navigation";
import { useDispatch , useSelector} from "react-redux";
import { logout } from "../redux/userSlice";

const Header = () => {
    const router = useRouter();
    const userLogin = useSelector(state=>state.user.loginInformation);
    const logoutUser = useDispatch();
    const handleLogout = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("userInDetails"));
            if (!user || !user.id) {
                console.log("No user found in localStorage");
                router.push("/");
                return;
            }
            const response = await fetch(`http://localhost:3001/userInfo/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: false,
                }),
            });
            if (!response.ok) {
                throw new Error("Logout API is not working. Check backend.");
            }
            const res = await response.json();
            console.log("Logout Response:", res);
            // Status should be false after logout
            if (res.status === false) {
                localStorage.removeItem("userInDetails");
                logoutUser(logout());
                router.push("/");
            } else {
                console.log("Status not updated to false");
            }
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        
        {/* Brand */}
        <Navbar.Brand as={Link} href="/">
          Study Project
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav className="">
            <Nav.Link as={Link} href="/loancalCalculator">Home</Nav.Link>
            <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav className="">
            <span className="text-white d-inline-block m-2 text-uppercase">{userLogin.username}</span>
            <Button variant="primary" onClick={()=> handleLogout()}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
