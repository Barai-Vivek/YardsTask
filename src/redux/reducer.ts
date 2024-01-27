import {AnyAction, combineReducers} from '@reduxjs/toolkit';
import {hierarchyReducer} from './hierachyRedux/hierarchySlice';
import {memberReducer} from './memberRedux/memberSlice';

// Combine all reducers into a single rootReducer
const appReducer = combineReducers({
  team: hierarchyReducer,
  member: memberReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction,
) => {
  return appReducer(state, action);
};

export default rootReducer;
