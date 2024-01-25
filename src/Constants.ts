import {Dimensions} from 'react-native';
import {EmployeesData} from './screens/components/types';
export const {width, height} = Dimensions.get('screen');

const guidelineBaseWidth: number = 375;

export const {width: screenWidth, height: screenHeight} =
  Dimensions.get('screen');

export const scale = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;

const [shortDimension] = width < height ? [width, height] : [height, width];

export const moderateScale = (size: number, factor: number = 0.1): number =>
  Math.round(size + (scale(size) - size) * factor);

export const employeeData: EmployeesData[] = [
  {
    position: 'CEO',
    name: 'Company CEO',
    email: '',
    phoneNumber: '',
    id: '',
    children: [
      {
        position: 'Head of staff/HR',
        name: 'Name of HR',
        email: '',
        phoneNumber: '',
        id: '',
        children: [
          {
            position: 'Team',
            name: 'Name of Team 1',
            id: '',
            children: [
              {
                position: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                children: [
                  {
                    position: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                  },
                  {
                    position: 'Team member',
                    name: 'Name of Another Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                  },
                ],
              },
            ],
          },
          {
            position: 'Team',
            name: 'Name of Team 2',
            id: '',
            children: [
              {
                position: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                children: [
                  {
                    position: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
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
        children: [
          {
            position: 'Team',
            name: 'Name of Team',
            id: '',
            children: [
              {
                position: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                children: [
                  {
                    position: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
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
        children: [
          {
            position: 'Team',
            name: 'Team name',
            id: '',
            children: [
              {
                position: 'Team Leader',
                name: 'Team leader name',
                email: '',
                phoneNumber: '',
                id: '',
                children: [
                  {
                    position: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
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
