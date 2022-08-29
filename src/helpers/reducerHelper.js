export function createReducer(handleActions, initialState = {}) {
  return function reducer(state = initialState, action, ...otherParams) {
    return handleActions[action.type]
      ? handleActions[action.type](state, action, ...otherParams)
      : state;
  };
}