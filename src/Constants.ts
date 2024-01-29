import {EmployeeData} from './screens/types';

export const HOME_SCREEN = 'HOME_SCREEN';
export const EMPLOYEE_COMPONENT_SCREEN = 'EMPLOYEE_COMPONENT_SCREEN';
export const TEAM_FORM_SCREEN = 'TEAM_FORM_SCREEN';
export const ADD_TEAM = 'Add Team';
export const EDIT_TEAM = 'Edit Team';
export const ADD_EMPLOYEE = 'Add Employee';
export const EDIT_EMPLOYEE = 'Edit Employee';
export const ALL_EMPLOYEES = 'All Employees';
export const TEAM = 'Team';
export const HIERARCHY = 'Hierarchy';

export enum DEPARTMENT {
  STAFF_HR = 'staff/HR',
  ENGINEERING = 'Engineering',
  DESIGN = 'Design',
}
export const departments: string[] = [
  DEPARTMENT.STAFF_HR,
  DEPARTMENT.ENGINEERING,
  DEPARTMENT.DESIGN,
];

export enum ROLE {
  CEO = 'CEO',
  TEAM = 'TEAM',
  HEAD = 'HEAD',
  TEAM_LEADER = 'TEAM LEADER',
  TEAM_MEMBER = 'TEAM MEMBER',
}

export const roles: string[] = [ROLE.TEAM_LEADER, ROLE.TEAM_MEMBER];

export const generateUUID = (): string => {
  let d = new Date().getTime(); // Timestamp
  let d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; // Time in microseconds since page-load or 0 if unsupported

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16; // Random number between 0 and 16
    let result;

    if (d > 0) {
      // Use timestamp until depleted
      result = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      result = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }

    return (c === 'x' ? result : (result & 0x3) | 0x8).toString(16);
  });
};

export const defaultEmployees: EmployeeData[] = [
  {
    role: ROLE.CEO,
    name: 'Company CEO',
    email: 'ceo@company.com',
    phoneNumber: '1234567890',
    id: '1',
    children: [
      {
        role: ROLE.HEAD,
        name: 'Name of staff/HR head',
        email: 'hr@company.com',
        phoneNumber: '3434534232',
        id: '2',
        department: DEPARTMENT.STAFF_HR,
        children: [],
      },
      {
        role: ROLE.HEAD,
        name: 'Name of engineering head',
        email: 'engineerhead@company.com',
        phoneNumber: '324254',
        id: '5',
        department: DEPARTMENT.ENGINEERING,
        children: [],
      },
      {
        role: ROLE.HEAD,
        name: 'Name of design head',
        email: 'designhead@company.com',
        phoneNumber: '32432452',
        id: '8',
        department: DEPARTMENT.DESIGN,
        children: [],
      },
    ],
  },
];
