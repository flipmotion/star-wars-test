import { memo, useCallback } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector } from 'react-redux';
import { useActions } from '../../../hooks';
import { fetchCharacters } from '../../../actions';

const PaginationList = ({
  page,
  next,
  prev,
  pages,
  onNextPage,
  onPrevPage,
  onFirstPage,
  onLastPage,
  onPage,
}) => {
  const isNextDisabled = !Boolean(next);
  const isPrevDisabled = !Boolean(prev);

  const onSelectPage = selectedPage => () => onPage(selectedPage);

  return (
    <Pagination>
      <Pagination.First disabled={isPrevDisabled} onClick={onFirstPage} />
      <Pagination.Prev disabled={isPrevDisabled} onClick={onPrevPage} />
      {pages.map(pageItem => (
        <Pagination.Item
          key={pageItem}
          active={page === pageItem + 1}
          onClick={onSelectPage(pageItem + 1)}
        >
          {pageItem + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={isNextDisabled} onClick={onNextPage}/>
      <Pagination.Last disabled={isNextDisabled} onClick={onLastPage} />
    </Pagination>
  );
};

const MemoizedPaginationList = memo(PaginationList);

const ContainerPaginationList = () => {
  const {page, next, prev, totalPages} = useSelector((({ general }) => general));
  const requestCharacters = useActions(fetchCharacters);

  const pages = [...Array(totalPages).keys()];

  const onNextPage = () => next ? requestCharacters({page: next}) : Function.prototype;
  const onPrevPage = () => prev ? requestCharacters({page: prev}) : Function.prototype;
  const onFirstPage = () => requestCharacters({page: 1});
  const onLastPage = () => requestCharacters({page: totalPages});
  const onPage = page => requestCharacters({page});

  return (
    <MemoizedPaginationList
      page={page}
      next={next}
      prev={prev}
      pages={pages}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
      onFirstPage={onFirstPage}
      onLastPage={onLastPage}
      onPage={onPage}
    />
  );
};

export default memo(ContainerPaginationList);
