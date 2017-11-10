import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import event from './event';

export default combineReducers({
  event,
  routing
});
