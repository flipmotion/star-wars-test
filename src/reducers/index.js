import {createReducer} from '../helpers/reducerHelper';
import * as actions from '../constants';

const initialState = {
  isLoading: false,
  characters: [],
  perPage: 10, // from api we recieved limit of 10, so its just mock
  totalPages: 0,
  page: 1,
  next: null,
  prev: null,
  error: null,
};

export const generalReducer = createReducer(
  {
    [actions.FETCH_CHARACTERS_REQUEST](state, {page}) {
      return {
        ...state,
        isLoading: true,
        characters: [],
        page,
        error: null,
      };
    },
    [actions.FETCH_CHARACTERS_SUCCESS](state, {characters, next, prev, totalPages}) {
      return {
        ...state,
        isLoading: false,
        characters,
        next,
        prev,
        totalPages,
      };
    },
    [actions.FETCH_CHARACTERS_FAILURE](state, {error}) {
      return {
        ...state,
        isLoading: false,
        characters: null,
        error,
      };
    },
  },
  initialState,
);
