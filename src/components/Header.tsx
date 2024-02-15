import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="bg-body-tertiary">
      <Container>
        <Row>
          <Col>
            <Link
              to="/"
              className="text-dark link-underline link-underline-opacity-0"
            >
              <h2 className="d-inline-block my-3 fw-bold">
                <i className="fa-solid fa-meteor"></i> Space News
              </h2>
            </Link>
          </Col>
        </Row>
      </Container>
    </nav>
  )
}

export default Header
