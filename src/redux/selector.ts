import {createSelector} from '@reduxjs/toolkit';
import {ROLE} from '../Constants';
import {RootState} from './type';
import {EmployeeData} from '../screens';

const teamState = (state: RootState) => state.team;

export const selectEmployeeData = createSelector(
  teamState,
  state => state.employees,
);

export const selectTeamData = (department?: string) =>
  createSelector(teamState, state => {
    const employees = state.employees;
    if (department) {
      if (department) {
        // Find the CEO
        const ceo = employees.find(employee => employee.role === ROLE.CEO);
        if (!ceo) {
          return [];
        }

        // Find the department head within the CEO's children
        const departmentHead = ceo.children?.find(
          child => child.department === department && child.role === ROLE.HEAD,
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
  });

export const selectTeamLeader = (department?: string, teamName?: string) =>
  createSelector(teamState, state => {
    const employees = state.employees;
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

    const team = departmentHead.children?.find(team => team.name === teamName);

    if (!team || !team.children) {
      return false;
    }

    // Check if there is at least one team leader in the team
    return team.children.some(employee => employee.role === ROLE.TEAM_LEADER);
  });

export const selectAllTeamNames = createSelector(teamState, state => {
  const employees = state.employees;
  const getTeamNames = (employees: EmployeeData[]): string[] => {
    return employees.reduce((acc: string[], employee: EmployeeData) => {
      if (employee.role === ROLE.TEAM) {
        acc.push(employee.name);
      }
      if (employee.children) {
        acc = acc.concat(getTeamNames(employee.children));
      }
      return acc;
    }, []);
  };

  return getTeamNames(employees);
});

export const selectDepartmentTeams = (department?: string) =>
  createSelector(teamState, state => {
    const employees = state.employees;
    if (!department) {
      return false; // If either department or teamName is not provided, return false
    }

    const ceo = employees.find(employee => employee.role === ROLE.CEO);
    if (!ceo) {
      return false;
    }

    const departmentHead = ceo.children?.find(
      child => child.department === department && child.role === ROLE.HEAD,
    );
    if (!departmentHead || !departmentHead.children) {
      return false;
    }

    // Check if there is at least one team in particular department
    return departmentHead.children.some(team => team.role === ROLE.TEAM);
  });

export const selectAllowDeleteTeamMember = (
  department?: string,
  teamName?: string,
) =>
  createSelector(teamState, state => {
    const employees = state.employees;
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

    const team = departmentHead.children?.find(team => team.name === teamName);

    if (!team || !team.children) {
      return false;
    }

    const teamLeader = team.children[0];
    if (!teamLeader || !teamLeader.children) {
      return false;
    }

    // Check if there is at least one team leader in the team
    return teamLeader.children.length > 1;
  });
