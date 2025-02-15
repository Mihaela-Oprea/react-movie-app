import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"; // Importăm iconițele de rețele sociale
import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear(); // Obținem anul curent

  return (
    <footer className="footer py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          {/*Coloană care ocupă întreaga lățime pe ecrane mici (xs) și doar 25% din lățime pe ecrane medii și mai mari (md) */}
          <Col xs={12} md={3}>
            <h5>About Us</h5>
            <p className="footer-text-container">
              MovieWeb is your destination for exploring popular movies, new
              releases, and your favorite genres all in one place.
            </p>
          </Col>

          <Col xs={12} md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Movies</a>
              </li>
              <li>
                <a href="#">TV Shows</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </Col>

          <Col xs={12} md={3}>
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </Col>

          <Col xs={12} md={3}>
            <h5>Follow Us</h5>
            <a href="#" className="mx-2">
              <FaFacebook size={25} />
            </a>
            <a href="#" className="mx-2">
              <FaInstagram size={25} />
            </a>
            <a href="#" className="mx-2">
              <FaYoutube size={25} />
            </a>
          </Col>
        </Row>

        <hr className="my-3" />
        <Row>
          <Col>
            <p className="text-center text-secondary">
              &copy; {currentYear} MovieWeb. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
