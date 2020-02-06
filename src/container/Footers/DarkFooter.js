/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="/landing-page"
                target="/landing-page"
              >
                About Us
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}

export default DarkFooter;
