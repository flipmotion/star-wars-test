import {createReducer} from '../helpers/reducerHelper';
import * as actions from '../constants';

const initialState = {
  isLoading: false,
  characters: [],
  character: {
    birth_year: '',
    name: '',
    created: '',
    edited: '',
    eye_color: '',
    gender: '',
    skin_color: ''
  },
  perPage: 10, // from api we recieved limit of 10, so its just mock
  totalPages: 0,
  page: 1,
  next: null,
  prev: null,
  error: null,
};

export const generalReducer = createReducer(
  {
    [actions.SET_IS_LOADING](state, {isLoading}) {
      return {
        ...state,
        isLoading,
      };
    },
    [actions.FETCH_CHARACTERS_REQUEST](state, {page}) {
      return {
        ...state,
        characters: [],
        page,
        error: null,
      };
    },
    [actions.FETCH_CHARACTERS_SUCCESS](state, {characters, next, prev, totalPages}) {
      return {
        ...state,
        characters,
        next,
        prev,
        totalPages,
      };
    },
    [actions.FETCH_CHARACTERS_FAILURE](state, {error}) {
      return {
        ...state,
        characters: null,
        error,
      };
    },
    [actions.FETCH_CHARACTER_REQUEST](state) {
      return {
        ...state,
        character: {...initialState.character},
        error: null,
      };
    },
    [actions.FETCH_CHARACTER_SUCCESS](state, {character}) {
      return {
        ...state,
        character,
      };
    },
    [actions.FETCH_CHARACTER_FAILURE](state, {error}) {
      return {
        ...state,
        character: {...initialState.character},
        error,
      };
    },
  },
  initialState,
);
