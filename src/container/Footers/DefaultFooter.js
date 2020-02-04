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
          {/* <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
            <a
              href="https://www.invisionapp.com?ref=nukr-default-footer"
              target="_blank"
            >
              Shubham
            </a>
            . Coded by{" "}
            <a
              href="https://www.creative-tim.com?ref=nukr-default-footer"
              target="_blank"
            >
              Shubham
            </a>
            .
          </div> */}
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
