import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ROLE, defaultEmployees} from '../../Constants';
import {MEMBER, TEAM} from '../redux';
import {EmployeeData, TeamMemberDetails} from '../../screens/types';

export interface MemberState {
  teamMemberDetails: TeamMemberDetails[];
}

const initialState: MemberState = {
  teamMemberDetails: [],
};

const {actions, reducer} = createSlice({
  name: MEMBER,
  initialState: initialState,
  reducers: {
    addMember: (state, action: PayloadAction<TeamMemberDetails>) => {
      const data = action.payload;
      console.log({data});

      state.teamMemberDetails.push(action.payload);
    },
    editMember: (state, action: PayloadAction<TeamMemberDetails>) => {
      const data = action.payload;
      const id = data.id;
      const index = state.teamMemberDetails.findIndex(
        member => member.id === id,
      );
      state.teamMemberDetails[index] = data;
    },
    deleteMember: (state, action: PayloadAction<TeamMemberDetails>) => {
      const data = action.payload;
      const id = data.id;
      const index = state.teamMemberDetails.findIndex(
        member => member.id === id,
      );
      state.teamMemberDetails.splice(index, 1);
    },
  },
});

export const memberActions = {
  ...actions,
};
export const memberReducer = reducer;
