import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ROLE, defaultEmployees} from '../Constants';
import {TEAM} from './redux';
import {EmployeeData} from '../screens/types';

export interface TeamState {
  employees: EmployeeData[];
}

const initialState: TeamState = {
  employees: defaultEmployees,
};

const {actions, reducer} = createSlice({
  name: TEAM,
  initialState: initialState,
  reducers: {
    addTeamMember: (state, action: PayloadAction<EmployeeData>) => {
      const data = action.payload;
      const role = data.role ?? '';
      const department = data.department ?? '';
      const teamName = data.team ?? '';

      // Find the CEO
      const ceo = state.employees.find(employee => employee.role === ROLE.CEO);
      if (!ceo) return;

      // Find the department head within the CEO's children
      const departmentHead = ceo.children?.find(
        child => child.department === department && child.role === ROLE.HEAD,
      );
      if (!departmentHead) return;

      // Find the specific team
      const team = departmentHead.children?.find(
        team => team.name === teamName,
      );
      if (!team) return;

      // Add the team member to the team
      if (role === ROLE.TEAM_MEMBER) {
        //if team member is added add under team leader
        const teamLeader = team.children?.find(
          team => team.role === ROLE.TEAM_LEADER,
        );
        teamLeader?.children?.push(data);
      } else {
        team.children?.push(data);
      }
    },
  },
});

export const teamMemberActions = {
  ...actions,
};
export const teamReducer = reducer;
