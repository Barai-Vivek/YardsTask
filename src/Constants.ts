import {Dimensions} from 'react-native';
import { EmployeeData } from '.';
export const {width, height} = Dimensions.get('screen');

const guidelineBaseWidth: number = 375;

export const {width: screenWidth, height: screenHeight} =
  Dimensions.get('screen');

export const scale = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;

const [shortDimension] = width < height ? [width, height] : [height, width];

export const moderateScale = (size: number, factor: number = 0.1): number =>
  Math.round(size + (scale(size) - size) * factor);

export const employeeData: EmployeeData[] = [
  {
    position: 'CEO',
    name: 'Company CEO',
    email: '',
    phoneNumber: '',
    id: '',
    department: 'CEO',
    team: '',
    children: [
      {
        position: 'Head of staff/HR',
        name: 'Name of HR',
        email: '',
        phoneNumber: '',
        id: '',
        department: 'staff/HR',
        team: '',
        children: [
          {
            position: 'Team 1',
            name: 'Name of Team 1',
            id: '',
            department: 'staff/HR',
            team: 'Team 1',
            children: [
              {
                position: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                department: 'staff/HR',
                team: 'Team 1',
                children: [
                  {
                    position: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'staff/HR',
                    team: 'Team 1',
                  },
                  {
                    position: 'Team member',
                    name: 'Name of Another Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'staff/HR',
                    team: 'Team 1',
                  },
                ],
              },
            ],
          },
          {
            position: 'Team 2',
            name: 'Name of Team 2',
            id: '',
            department: 'staff/HR',
            team: 'Team 2',
            children: [
              {
                position: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                department: 'staff/HR',
                team: 'Team 2',
                children: [
                  {
                    position: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'staff/HR',
                    team: 'Team 2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        position: 'Head of engineering',
        name: 'Name of engineering head',
        email: '',
        phoneNumber: '',
        id: '',
        department: 'Engineering',
        team: '',
        children: [
          {
            position: 'Team 3',
            name: 'Name of Team 3',
            id: '',
            department: 'Engineering',
            team: 'Team 3',
            children: [
              {
                position: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                department: 'Engineering',
                team: 'Team 3',
                children: [
                  {
                    position: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'Engineering',
                    team: 'Team 3',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        position: 'Head of design',
        name: 'Name of design head',
        email: '',
        phoneNumber: '',
        id: '',
        department: 'Design',
        team: '',
        children: [
          {
            position: 'Team 4',
            name: 'Team name 4',
            id: '',
            department: 'Design',
            team: 'Team 4',
            children: [
              {
                position: 'Team Leader',
                name: 'Team leader name',
                email: '',
                phoneNumber: '',
                id: '',
                department: 'Design',
                team: 'Team 4',
                children: [
                  {
                    position: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'Design',
                    team: 'Team 4',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const departments = ['HR', 'Engineering', 'Design'];

export const teams: {[key: string]: string[]} = {
  HR: ['Team 1', 'Team 2'],
  Engineering: ['Team A', 'Team B'],
  Design: ['Team X', 'Team Y'],
};
