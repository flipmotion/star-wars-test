import { memo } from 'react';
import {
  Container,
  Row,
  Col,
  Navbar,
 } from 'react-bootstrap';
import { useActions } from '../../hooks';
import { goToMainPage } from '../../actions';

function Header() {
  const onGoMainPage = useActions(goToMainPage);
  const onClick = () => onGoMainPage();

  return (
    <header>
      <Navbar bg="dark">
        <Container>
          <Row>
            <Col>
              <button onClick={onClick} className="btn">
                <h4 className="text-white mt-2" >Star-Wars characters list</h4>
              </button>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  )
}

export default memo(Header);
