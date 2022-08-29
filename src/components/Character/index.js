import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
 } from 'react-bootstrap';
import { api } from '../../api';

const Character = () => {
  const {characterId} = useParams();

  useEffect(() => {
    api.get.characterById({id: characterId }).then(d => console.log(d));
  }, [])
  return (
    <Container>
      <Row>
        <Col>
          character
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Character);
