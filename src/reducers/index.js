import {
  CHANGE_PLAYER_ID, OPEN_MODAL, SET_MOVIES, SET_SERIES, SET_USER, SET_USERS,
} from '../actions';

const initialState = {
  modalIsOpen: true,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_PLAYER_ID:
      return {
        ...state,
        id: action.newId,
      };
    case SET_MOVIES:
      return {
        ...state,
        listMovies: action.data,
      };
    case SET_SERIES:
      return {
        ...state,
        listSeries: action.data,
      };
    case SET_USERS:
      return {
        ...state,
        listUsers: action.data,
      };
    case SET_USER:
      return {
        ...state,
        user: action.data,
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: action.data,
      };
    default:
      return state;
  }
}

export default reducer;
