/* eslint-disable import/prefer-default-export */

export const CHANGE_PLAYER_ID = 'CHANGE_PLAYER_ID';

export function changePlayerMovie(id) {
  return {
    type: CHANGE_PLAYER_ID,
    newId: id,
  };
}

export const SET_MOVIES = 'SET_MOVIES';

export function setMoviesData(data) {
  return {
    type: SET_MOVIES,
    data: data,
  };
}

export const SET_SERIES = 'SET_SERIES';

export function setSeriesData(data) {
  return {
    type: SET_SERIES,
    data: data,
  };
}

export const SET_USERS = 'SET_USERS';

export function setUsersData(data) {
  return {
    type: SET_USERS,
    data: data,
  };
}

export const SET_USER = 'SET_USER';

export function setUserData(data) {
  return {
    type: SET_USER,
    data: data,
  };
}
export const OPEN_MODAL = 'OPEN_MODAL';

export function setOpenModal(data) {
  return {
    type: OPEN_MODAL,
    data: data,
  };
}
