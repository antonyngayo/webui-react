import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";




function Dashboard() {

  const [state, setState] = useState([]);
  const [queue, setQueue] = useState([]);
  let term = " ";
  // creating a setTimeout function that will be calling the enqueued enpoint every 30s
  const handleSearch = event => {
    event.preventDefault();
    term = event.target.value;
      fetch("https://dashboard.novum.co.ke/api/search/"+term)
      .then(response => response.json())
      .then(data => {
        setState(data)
      })
      .catch((error) => {
        console.error('Error:', error);
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetch("https://dashboard.novum.co.ke/api/queue")
      .then(response => response.json())
      .then(data => {
        setQueue(data)
      })
      .catch((error) => {
        console.error('Error:', error);
    });
    }, 1000);
    return () => clearInterval(timer);
  }, []);



  const rows = [];
  if(state.length > 0 ){
    for(var i = 0; i < state.length; i++ ){
      rows.push(
        <tr key={state[i].id}>
          <td>{state[i].id}</td>
          <td>{state[i].title}</td>
          <td>{(state[i].conversion_status) ? "Converted" : "in conversion queue"}</td>
          <td>{state[i].upload_time}</td>
        </tr>
      )
    }
  }


  return (
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Enqueued Videos</p>
                      <Card.Title as="h4">{queue.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Encoded</p>
                      <Card.Title as="h4">1400</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">

          </Col>
        </Row>
        <Row>
          <Col md="10">
            <Card>
              <Card.Header>
                   <Card.Title as="h4">Search</Card.Title>
                   <Card.Body>
                      <input type="text" onChange={handleSearch} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i className="nc-icon nc-zoom-split"></i>
                   </Card.Body>
              </Card.Header>
            </Card>
            <Table className="table-hover table-striped">
                    <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Title</th>
                      <th className="border-0">conversion status</th>
                      <th className="border-0">upload date/time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
             </Table>
          </Col>
        </Row>
        <Row>
        </Row>
      </Container>
  );
}

export default Dashboard;
