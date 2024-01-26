import {configureStore} from '@reduxjs/toolkit';
import {defaultEmployees} from '../Constants';
import {teamReducer} from './teamSlice';

const preloadedState = {
  team: {
    employees: defaultEmployees,
  },
};

const store = configureStore({
  reducer: {
    team: teamReducer,
  },
  preloadedState,
});

export default store;
