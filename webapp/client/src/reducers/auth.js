import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticaded: '',
  errorMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticaded: action.payload };
      break;
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload};
      break;
    default:
      return state;
  }
}
