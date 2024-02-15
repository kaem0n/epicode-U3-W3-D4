import { useEffect, useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  const [check, setCheck] = useState(Boolean(localStorage.getItem('checked')))

  const changeTheme = (boolean: boolean) => {
    const html = document.getElementsByTagName('html')[0]
    if (boolean === true) {
      localStorage.setItem('checked', String(check))
      html.setAttribute('data-bs-theme', 'light')
    } else {
      localStorage.clear()
      html.setAttribute('data-bs-theme', 'dark')
    }
  }

  const handleCheck = () => {
    setCheck(!check)
  }

  useEffect(() => {
    changeTheme(check)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check])

  return (
    <nav className="bg-body-tertiary">
      <Container>
        <Row>
          <Col className="d-flex justify-content-between">
            <Link
              to="/"
              className="link-underline link-underline-opacity-0"
              style={{ color: `var(--bs-heading-color)` }}
            >
              <h2 className="d-inline-block my-3 fw-bold">
                <i className="fa-solid fa-meteor"></i> Space News
              </h2>
            </Link>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-circle-half-stroke me-1"></i>
              <Form.Switch onChange={() => handleCheck()} checked={check} />
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  )
}

export default Header
