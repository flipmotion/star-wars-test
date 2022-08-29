import { push } from '@lagunovsky/redux-react-router'
import * as actions from '../constants';
import { api } from '../api';

export const fetchCharacters = ({page = 1}) => (dispatch, getState) => {
  const {
    general,
  } = getState();

  dispatch({
    type: actions.FETCH_CHARACTERS_REQUEST,
    page,
  });

  api.get.characters({page}).then(
    response => {
      const nextUrl = response.next ? new URL(response.next).search : '';
      const prevUrl = response.previous ? new URL(response.previous).search : '';
      const next = +(nextUrl.replace(/\D/g, ''));
      const prev = +(prevUrl.replace(/\D/g, ''));
      const totalPages = Math.ceil(response.count / general.perPage);

      dispatch({
        type: actions.FETCH_CHARACTERS_SUCCESS,
        characters: response.results,
        next: !next ? null : next,
        prev: !prev ? null : prev,
        totalPages,
      })
    },
    error => dispatch({
      type: actions.FETCH_CHARACTERS_FAILURE,
      error
    })
  );
}

export const goToCharacter = ({ id }) => dispatch => {
  dispatch(push(`/character/${id}`));
};

export const goToMainPage = () => dispatch => dispatch(push('/'));