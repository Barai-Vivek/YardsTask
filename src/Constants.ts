import {Dimensions} from 'react-native';
import {EmployeeData} from './screens/types';
export const {width, height} = Dimensions.get('screen');

const guidelineBaseWidth: number = 375;

export const {width: screenWidth, height: screenHeight} =
  Dimensions.get('screen');

export const scale = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;

const [shortDimension] = width < height ? [width, height] : [height, width];

export const moderateScale = (size: number, factor: number = 0.1): number =>
  Math.round(size + (scale(size) - size) * factor);

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
        children: [
          {
            role: ROLE.TEAM,
            name: 'Team 1',
            id: '3',
            department: DEPARTMENT.STAFF_HR,
            children: [],
          },
          {
            role: ROLE.TEAM,
            name: 'Team 2',
            id: '4',
            department: DEPARTMENT.STAFF_HR,
            children: [],
          },
        ],
      },
      {
        role: ROLE.HEAD,
        name: 'Name of engineering head',
        email: 'engineerhead@company.com',
        phoneNumber: '324254',
        id: '5',
        department: DEPARTMENT.ENGINEERING,
        children: [
          {
            role: ROLE.TEAM,
            name: 'Team A',
            id: '6',
            department: DEPARTMENT.ENGINEERING,
            children: [],
          },
          {
            role: ROLE.TEAM,
            name: 'Team B',
            id: '7',
            department: DEPARTMENT.ENGINEERING,
            children: [],
          },
        ],
      },
      {
        role: ROLE.HEAD,
        name: 'Name of design head',
        email: 'designhead@company.com',
        phoneNumber: '32432452',
        id: '8',
        department: DEPARTMENT.DESIGN,
        children: [
          {
            role: ROLE.TEAM,
            name: 'Team X',
            id: '9',
            department: DEPARTMENT.DESIGN,
            children: [],
          },
          {
            role: ROLE.TEAM,
            name: 'Team Y',
            id: '10',
            department: DEPARTMENT.DESIGN,
            children: [],
          },
        ],
      },
    ],
  },
];

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

// export const employeeData: EmployeeData[] = [
//   {
//     role: 'CEO',
//     name: 'Company CEO',
//     email: 'ceo@company.com',
//     phoneNumber: '1234567890',
//     id: '1',
//     department: 'CEO',
//     team: '',
//     children: [
//       {
//         role: 'Head of staff/HR',
//         name: 'Name of HR',
//         email: '',
//         phoneNumber: '',
//         id: '',
//         department: DEPARTMENT.STAFF_HR,
//         team: '',
//         children: [
//           {
//             role: 'Team 1',
//             name: 'Name of Team 1',
//             id: '',
//             department: DEPARTMENT.STAFF_HR,
//             team: 'Team 1',
//             children: [
//               {
//                 role: 'Team Leader',
//                 name: 'Name of Team leader',
//                 email: '',
//                 phoneNumber: '',
//                 id: '',
//                 department: DEPARTMENT.STAFF_HR,
//                 team: 'Team 1',
//                 children: [
//                   {
//                     role: 'Team member',
//                     name: 'Name of Team member',
//                     email: '',
//                     phoneNumber: '',
//                     id: '',
//                     department: DEPARTMENT.STAFF_HR,
//                     team: 'Team 1',
//                   },
//                   {
//                     role: 'Team member',
//                     name: 'Name of Another Team member',
//                     email: '',
//                     phoneNumber: '',
//                     id: '',
//                     department: DEPARTMENT.STAFF_HR,
//                     team: 'Team 1',
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             role: 'Team 2',
//             name: 'Name of Team 2',
//             id: '',
//             department: DEPARTMENT.STAFF_HR,
//             team: 'Team 2',
//             children: [
//               {
//                 role: 'Team Leader',
//                 name: 'Name of Team leader',
//                 email: '',
//                 phoneNumber: '',
//                 id: '',
//                 department: DEPARTMENT.STAFF_HR,
//                 team: 'Team 2',
//                 children: [
//                   {
//                     role: 'Team member',
//                     name: 'Name of Team member',
//                     email: '',
//                     phoneNumber: '',
//                     id: '',
//                     department: DEPARTMENT.STAFF_HR,
//                     team: 'Team 2',
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         role: 'Head of engineering',
//         name: 'Name of engineering head',
//         email: '',
//         phoneNumber: '',
//         id: '',
//         department: DEPARTMENT.ENGINEERING,
//         team: '',
//         children: [
//           {
//             role: 'Team 3',
//             name: 'Name of Team 3',
//             id: '',
//             department: DEPARTMENT.ENGINEERING,
//             team: 'Team 3',
//             children: [
//               {
//                 role: 'Team Leader',
//                 name: 'Name of Team leader',
//                 email: '',
//                 phoneNumber: '',
//                 id: '',
//                 department: DEPARTMENT.ENGINEERING,
//                 team: 'Team 3',
//                 children: [
//                   {
//                     role: 'Team member',
//                     name: 'Name of Team member',
//                     email: '',
//                     phoneNumber: '',
//                     id: '',
//                     department: DEPARTMENT.ENGINEERING,
//                     team: 'Team 3',
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         role: 'Head of design',
//         name: 'Name of design head',
//         email: '',
//         phoneNumber: '',
//         id: '',
//         department: DEPARTMENT.DESIGN,
//         team: '',
//         children: [
//           {
//             role: 'Team 4',
//             name: 'Team name 4',
//             id: '',
//             department: DEPARTMENT.DESIGN,
//             team: 'Team 4',
//             children: [
//               {
//                 role: 'Team Leader',
//                 name: 'Team leader name',
//                 email: '',
//                 phoneNumber: '',
//                 id: '',
//                 department: DEPARTMENT.DESIGN,
//                 team: 'Team 4',
//                 children: [
//                   {
//                     role: 'Team member',
//                     name: 'Name of Team member',
//                     email: '',
//                     phoneNumber: '',
//                     id: '',
//                     department: DEPARTMENT.DESIGN,
//                     team: 'Team 4',
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
