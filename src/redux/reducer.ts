import {combineReducers} from '@reduxjs/toolkit';
import {TeamState, teamReducer} from './teamSlice'; // Assuming you have exported TeamState from teamSlice

// Define the root state interface
export interface RootState {
  team: TeamState;
}

// Combine all reducers into a single rootReducer
const rootReducer = combineReducers({
  team: teamReducer,
});

export default rootReducer;
