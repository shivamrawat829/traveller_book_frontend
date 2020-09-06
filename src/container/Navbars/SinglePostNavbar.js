import React from "react";
import { Link, NavLink as N, withRouter } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Modal,
  Button
} from "reactstrap";
import axios from 'axios';

function SinglePageNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [modalLive, setModalLive] = React.useState(false);

  const deletePost = e => {
    console.log("chalaaaaaaaaaaaaaaaaaaaaaa", props)
    axios.delete(`http://192.168.100.6:8000/api/posts/${props.post_id}/delete/`, {
  })
  .then(res => {
      props.history.push('/');
  })
  .catch(err => {
      console.log(err)
  })
  }
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="primary" expand="lg">
        <Container>
          
          <div className="navbar-translate">
            
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <N to="/" tag={Link}>
                  Home Page
                </N>
              </NavItem>  
              <NavItem>
              <Button
              className='nav-link'
                color="danger"
                type="button"
                onClick={() => setModalLive(true)}
              >
                Delete Post
              </Button>
              </NavItem>

            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <Modal toggle={() => setModalLive(false)} isOpen={modalLive}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Delete Post
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalLive(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this post...</p>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalLive(false)}
          >
            Close
          </Button>
          <Button
            color="danger"
            type="button"
            // onClick={() => setModalLive(false)}
            onClick={() => deletePost()}
          >
           Delete
          </Button>
        </div>
      </Modal>


    </>
  );
}

export default SinglePageNavbar;
