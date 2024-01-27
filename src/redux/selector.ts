import {createSelector} from '@reduxjs/toolkit';
import {ROLE} from '../Constants';
import {RootState} from './type';

export const selectEmployeeData = createSelector(
  (state: RootState) => state.team.employees,
  employees => employees,
);

export const selectTeamData = (department?: string) =>
  createSelector(
    (state: RootState) => state.team.employees,
    employees => {
      if (department) {
        if (department) {
          // Find the CEO
          const ceo = employees.find(employee => employee.role === ROLE.CEO);
          if (!ceo) {
            return [];
          }

          // Find the department head within the CEO's children
          const departmentHead = ceo.children?.find(
            child =>
              child.department === department && child.role === ROLE.HEAD,
          );
          if (!departmentHead) {
            return [];
          }

          // Filter the department head's children to get the teams
          const teams = departmentHead.children
            ?.filter(child => child.role === ROLE.TEAM)
            .map(team => {
              return team.name;
            });

          return teams;
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
  );

export const selectTeamLeader = (department?: string, teamName?: string) =>
  createSelector(
    (state: RootState) => state.team.employees,
    employees => {
      if (!department || !teamName) {
        return false; // If either department or teamName is not provided, return false
      }

      const ceo = employees.find(employee => employee.role === ROLE.CEO);
      if (!ceo) {
        return false;
      }

      const departmentHead = ceo.children?.find(
        child => child.department === department && child.role === ROLE.HEAD,
      );
      if (!departmentHead) {
        return false;
      }

      const team = departmentHead.children?.find(
        team => team.name === teamName,
      );

      if (!team || !team.children) {
        return false;
      }

      // Check if there is at least one team leader in the team
      return team.children.some(employee => employee.role === ROLE.TEAM_LEADER);
    },
  );

export const selectMembersData = createSelector(
  (state: RootState) => state.member.teamMemberDetails,
  members => members,
);

export const selectMemberSearchTextData = (searchQuery: string) =>
  createSelector(
    (state: RootState) => state.member.teamMemberDetails,
    members =>
      members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );
