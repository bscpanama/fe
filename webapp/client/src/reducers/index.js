import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import Movements from './reducers';

export default combineReducers({
  auth,
  form: formReducer,
  movements: Movements
});
