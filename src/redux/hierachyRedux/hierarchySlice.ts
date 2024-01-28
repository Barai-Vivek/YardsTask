import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ROLE, defaultEmployees} from '../../Constants';
import {TEAM} from '../redux';
import {EmployeeData, UpdateEmployee} from '../../screens/types';

export type HierarchyState = {
  employees: EmployeeData[];
};

const initialState: HierarchyState = {
  employees: defaultEmployees,
};

const {actions, reducer} = createSlice({
  name: TEAM,
  initialState: initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<EmployeeData>) => {
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
    editEmployeeByIndex: (state, action: PayloadAction<UpdateEmployee>) => {
      const updatedEmployee = action.payload.employee;
      const indexes = action.payload.indexes;

      if (indexes && indexes.length > 0) {
        if (indexes.length === 1) {
          //Edit CEO
        } else if (indexes.length === 2) {
          //Edit HEAD
          const [ceoIndex, headIndex] = indexes;
          const heads = state.employees[ceoIndex].children ?? [];
          heads[headIndex] = updatedEmployee;
        } else if (indexes.length === 3) {
          //Edit Team
          const [ceoIndex, headIndex, teamIndex] = indexes;
          const teams =
            state.employees[ceoIndex]?.children?.[headIndex]?.children ?? [];
          teams[teamIndex] = updatedEmployee;
        } else if (indexes.length === 4) {
          //Edit Team Leader
          const [ceoIndex, headIndex, teamIndex, teamLeaderIndex] = indexes;
          const teamLeaders =
            state.employees[ceoIndex]?.children?.[headIndex]?.children?.[
              teamIndex
            ]?.children ?? [];
          teamLeaders[teamLeaderIndex] = updatedEmployee;
        } else if (indexes.length === 5) {
          //Edit Employee
          const [
            ceoIndex,
            headIndex,
            teamIndex,
            teamLeaderIndex,
            teamMemberIndex,
          ] = indexes;
          const teamMembers =
            state.employees[ceoIndex]?.children?.[headIndex]?.children?.[
              teamIndex
            ]?.children?.[teamLeaderIndex]?.children ?? [];
          teamMembers[teamMemberIndex] = updatedEmployee;
        }
      }
    },
    deleteEmployeeByIndex: (state, action: PayloadAction<UpdateEmployee>) => {
      const indexes = action.payload.indexes;
      if (indexes && indexes.length === 5) {
        //Delete Employee
        const [
          ceoIndex,
          headIndex,
          teamIndex,
          teamLeaderIndex,
          teamMemberIndex,
        ] = indexes;
        const teamMembers =
          state.employees[ceoIndex]?.children?.[headIndex]?.children?.[
            teamIndex
          ]?.children?.[teamLeaderIndex]?.children ?? [];
        teamMembers.splice(teamMemberIndex, 1);
      }
    },
    addTeam: (state, action: PayloadAction<UpdateEmployee>) => {
      const indexes = action.payload.indexes;
      const data = action.payload.employee;

      if (indexes && indexes.length === 2) {
        const [ceoIndex, headIndex] = indexes;
        const teams =
          state.employees[ceoIndex].children?.[headIndex].children ?? [];
        teams.push(data);
      }
    },
    addEmployeeByIndex: (state, action: PayloadAction<UpdateEmployee>) => {
      const indexes = action.payload.indexes;
      const employee = action.payload.employee;

      if (indexes) {
        if (indexes.length === 3) {
          //Add Team Leader
          const [ceoIndex, headIndex, teamIndex] = indexes;
          const teamLeaders =
            state.employees[ceoIndex]?.children?.[headIndex]?.children?.[
              teamIndex
            ]?.children ?? [];
          teamLeaders.push(employee);
        } else if (indexes.length === 4) {
          const [ceoIndex, headIndex, teamIndex, teamLeaderIndex] = indexes;
          //Add Employee
          const teamMembers =
            state.employees[ceoIndex]?.children?.[headIndex]?.children?.[
              teamIndex
            ]?.children?.[teamLeaderIndex]?.children ?? [];
          teamMembers.push(employee);
        }
      }
    },
  },
});

export const hierarchyActions = {
  ...actions,
};
export const hierarchyReducer = reducer;

// editEmployee: (state, action: PayloadAction<UpdateEmployee>) => {
//   const updatedEmployee = action.payload.employee;
//   const indexes = action.payload.indexes;
//     // Find the employee to edit
//     const findAndEditEmployee = (
//       employees: EmployeeData[],
//       targetId: string,
//     ): void => {
//       for (const employee of employees) {
//         if (employee.id === updatedEmployee.id) {
//           // Update the employee's fields
//           employee.name = updatedEmployee.name;
//           employee.email = updatedEmployee.email;
//           employee.phoneNumber = updatedEmployee.phoneNumber;
//           // Update other fields as needed

//           // Return once the employee is updated
//           return;
//         }

//         // Recursively search in children if present
//         if (employee.children) {
//           findAndEditEmployee(employee.children, targetId);
//         }
//       }
//     };
//     // Start the search from the top level
//     findAndEditEmployee(state.employees, updatedEmployee.id);
//
// },
// deleteEmployee: (state, action: PayloadAction<UpdateEmployee>) => {
//   const data = action.payload.employee;
//   const indexes = action.payload.indexes;
//     const updatedEmployees = [...state.employees];

//     const findAndDelete = (employee: EmployeeData) => {
//       if (employee.children) {
//         employee.children = employee.children.filter(
//           child => child.id !== data.id,
//         );
//         employee.children.forEach(child => findAndDelete(child));
//       }
//     };
//     updatedEmployees.forEach(employee => findAndDelete(employee));
//     state.employees = updatedEmployees;
// },
