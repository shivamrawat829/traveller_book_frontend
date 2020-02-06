/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
              
                <a
                  href="/landing-page"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
            
            </ul>
          </nav>
     
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
