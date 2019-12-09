import React from "react";

// reactstrap components
import {
  Badge,
  NavItem,
  NavLink,
  Nav,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";

// core components

function PaginationSection({ postsPerPage, totalPosts , paginate}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {

    // let active = paginate === i ? 'active' : '';
    pageNumbers.push(i);
  }

  const [pills, setPills] = React.useState("2");
  return (
    <>
      <div className="section section-pagination">
        <Container>
          <Row className="justify-content-center">
            {/* <Col md="6"> */}
              {/* <h4>Progress Bars</h4>
              <div className="progress-container">
                <span className="progress-badge">Default</span>
                <Progress max="100" value="25">
                  <span className="progress-value">25%</span>
                </Progress>
              </div>
              <div className="progress-container progress-info">
                <span className="progress-badge">Info</span>
                <Progress max="100" value="60">
                  <span className="progress-value">60%</span>
                </Progress>
              </div> */}
              {/* <br></br> */}
              {/* <h4>Navigation Pills</h4> */}
              {/* <Nav
                className="nav-pills-info nav-pills-just-icons"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    className={pills === "1" ? "active" : ""}
                    href="#pablo"
                    onClick={e => {
                      e.preventDefault();
                      setPills("1");
                    }}
                  >
                    <i className="far fa-gem"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={pills === "2" ? "active" : ""}
                    href="#pablo"
                    onClick={e => {
                      e.preventDefault();
                      setPills("2");
                    }}
                  >
                    <i className="fa fa-thermometer-full"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={pills === "3" ? "active" : ""}
                    href="#pablo"
                    onClick={e => {
                      e.preventDefault();
                      setPills("3");
                    }}
                  >
                    <i className="fa fa-suitcase"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#pablo" disabled>
                    <i className="fa fa-exclamation"></i>
                  </NavLink>
                </NavItem>
              </Nav> */}
            {/* </Col> */}
            <Col xs='10' lg='3' md='8'>
              <h4>Pagination</h4>
           

              <Pagination
                className="pagination pagination-info"
                listClassName="pagination-info"
              >




              <PaginationItem>
                  <PaginationLink
                    aria-label="Previous"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <span aria-hidden={true}>
                      <i
                        aria-hidden={true}
                        className="fa fa-angle-double-left"
                      ></i>
                    </span>
                  </PaginationLink>

                </PaginationItem>

                {pageNumbers.map(number => (
         

                  <PaginationItem className='active' key={number}>
                  <PaginationLink 
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </PaginationLink>
                  </PaginationItem>

              ))}

                <PaginationItem>
                  <PaginationLink
                    aria-label="Next"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <span aria-hidden={true}>
                      <i
                        aria-hidden={true}
                        className="fa fa-angle-double-right"
                      ></i>
                    </span>
                  </PaginationLink>
                </PaginationItem>
                
              </Pagination>
           
            </Col>
          </Row>
          {/* <br></br> */}
          <div className="space"></div>
          {/* <h4>Notifications</h4> */}
        </Container>
      </div>
    </>
  );
}

export default PaginationSection;
