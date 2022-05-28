import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { questions } from './questions.reducer';
import { items } from './items.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  questions,
  items,
  alert
});

export default rootReducer;