import { ROUTER_ON_LOCATION_CHANGED } from "@lagunovsky/redux-react-router";
import * as actions from '../constants';
import { api } from "../api";

const setIsLoading = ({isLoading}) => dispatch => dispatch({
  type: actions.SET_IS_LOADING,
  isLoading,
})

const paginationMiddleware = ({dispatch, getState}) => next => action => {
  const newAction = {...action};
  const {type, payload} = action;
  const {
    general,
  } = getState();

  switch (type) {
    case ROUTER_ON_LOCATION_CHANGED: {
      const isList = payload.location.pathname.includes('list')

      if (isList) {
        const pageFromLocation = +payload.location.pathname.replace(/\D/g, '');
        dispatch(setIsLoading({isLoading: true}));
        api.get.characters({page: pageFromLocation}).then(
          response => {
            const nextUrl = response.next ? new URL(response.next).search : '';
            const prevUrl = response.previous ? new URL(response.previous).search : '';
            const next = +(nextUrl.replace(/\D/g, ''));
            const prev = +(prevUrl.replace(/\D/g, ''));
            const totalPages = Math.ceil(response.count / general.perPage);
            console.log()
      
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
        dispatch({
          type: actions.FETCH_CHARACTERS_REQUEST,
          page: pageFromLocation,
        });
      }
      break;
    }

    default:
      break;
  }

  return next(newAction);
};

export default paginationMiddleware;
