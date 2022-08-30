import { memo } from 'react';
import { string } from 'prop-types';
import {
  Container,
  Row,
  Col,
 } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Character = ({
  birth_year,
  name,
  created,
  edited,
  eye_color,
  gender,
  skin_color,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <p>Birth year: {birth_year}</p>
          <p>Name: {name}</p>
          <p>Created: {created}</p>
          <p>Edited: {edited}</p>
          <p>Eye color: {eye_color}</p>
          <p>Gender: {gender}</p>
          <p>Skin color: {skin_color}</p>
        </Col>
      </Row>
    </Container>
  );
};

Character.propTypes = {
  birth_year: string,
  name: string,
  created: string,
  edited: string,
  eye_color: string,
  gender: string,
  skin_color: string,
}

const MemoizedCharacter = memo(Character);

const ContainerCharacter = () => {
  const {character} = useSelector((({ general }) => general));
  return <MemoizedCharacter {...character}/>
}

export default memo(ContainerCharacter);
