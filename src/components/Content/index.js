import { memo } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Item from './Item';
import Pagination from './Pagination';

const Content = ({
  isLoading,
  items,
}) => {
  return (
    <section>
      <Container>
        <Row>
          {!isLoading && items.map(({name = '', url = ''}) => (
            <Col md="4" key={name}>
              <Item
                name={name}
                url={url}
              />
            </Col>
          ))}
          {isLoading && 'Loading...'}
        </Row>
      </Container>
      {!isLoading && <Container>
        <Row>
          <Col>
            <Pagination />
          </Col>
        </Row>
      </Container>}
    </section>
  );
};

const MemoizedContent = memo(Content);

const ContainerContainer = () => {
  const {isLoading, characters} = useSelector((({ general }) => general));

  return (
    <MemoizedContent isLoading={isLoading} items={characters} />
  );
};

export default memo(ContainerContainer);
