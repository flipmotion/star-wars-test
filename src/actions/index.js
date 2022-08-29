import { push } from '@lagunovsky/redux-react-router'
import * as actions from '../constants';
import { api } from '../api';

const setIsLoading = ({isLoading}) => dispatch => dispatch({
  type: actions.SET_IS_LOADING,
  isLoading,
})

export const fetchCharacters = ({page = 1}) => (dispatch, getState) => {
  const {
    general,
  } = getState();

  dispatch(setIsLoading({isLoading: true}));
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
      dispatch(setIsLoading({isLoading: false}));
    },
    error => {
      dispatch({
        type: actions.FETCH_CHARACTERS_FAILURE,
        error
      })
      dispatch(setIsLoading({isLoading: false}));
    }
  );
}

export const goToCharacter = ({ id }) => dispatch => {
  dispatch(setIsLoading({isLoading: true}));

  dispatch({
    type: actions.FETCH_CHARACTER_REQUEST,
  });

  api.get.characterById({ id }).then(
    ({
      birth_year,
      name,
      created,
      edited,
      eye_color,
      gender,
      skin_color
    }) => {
      dispatch({
        type: actions.FETCH_CHARACTER_SUCCESS,
        character: {
          birth_year,
          name,
          created,
          edited,
          eye_color,
          gender,
          skin_color
        }
      })
      dispatch(setIsLoading({isLoading: false}));
      dispatch(push(`/character/${id}`));
    },
    error => {
      dispatch({
        type: actions.FETCH_CHARACTER_FAILURE,
        error
      })
      dispatch(setIsLoading({isLoading: false}));
    }
  );
  
};

export const goToMainPage = () => dispatch => dispatch(push('/'));
