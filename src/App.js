import { useEffect, memo } from "react";
import { func } from 'prop-types';
import { Outlet } from "react-router-dom";
import GlobalStyle from './GlobalStyles';
import Header from './components/Header';
import { useActions } from './hooks';
import { fetchCharacters } from './actions';


const App = ({
  fetchInitialCharacters,
}) => {
  useEffect(() => {
    fetchInitialCharacters();
  }, [fetchInitialCharacters])
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

App.propTypes = {
  fetchInitialCharacters: func.isRequired,
}

const MemoizedApp = memo(App);

const AppContainer = () => {
  const requestCharacters = useActions(fetchCharacters);

  const fetchInitialCharacters = () => requestCharacters({page: 1});

  return (
    <MemoizedApp fetchInitialCharacters={fetchInitialCharacters}/>
  );
}

export default memo(AppContainer);
