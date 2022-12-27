/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/prefer-default-export */
import { setOpenModal } from '../actions';

export function closeModal(dispatch) {
  dispatch(setOpenModal(false));
}
export function openModal(dispatch) {
  dispatch(setOpenModal(true));
}
