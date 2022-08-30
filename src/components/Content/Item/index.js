import { memo } from 'react';
import { string } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useActions } from '../../../hooks';
import { goToCharacter } from '../../../actions';


const Item = ({name, url}) => {
  const onGoToCharacter = useActions(goToCharacter);
  const { pathname } = new URL(url);
  const parsedId = +(pathname.replace(/\D/g, ''));

  const onClick = () => onGoToCharacter({id: parsedId});

  return (
    <Card className="mb-4 mt-4">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="primary" onClick={onClick}>Details</Button>
      </Card.Body>
    </Card>
  );
};

Item.propTypes = {
  name: string,
  url: string,
};

export default memo(Item);
