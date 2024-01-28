import {RouteProp} from '@react-navigation/native';
import {EmployeeData} from '.';

export type AddEmployeeParams = {
  employee?: EmployeeData;
  indexes?: number[];
  addNewEmployee: boolean;
  fromScreen: string;
};

export type AddTeamParams = {
  employee?: EmployeeData;
  indexes?: number[];
  addTeam: boolean;
};

export enum NavigationRoutes {
  EMPLOYEES = 'EMPLOYEES',
  ADD_EMPLOYEE = 'ADD_EMPLOYEE',
  ALL_MEMBERS = 'ALL_MEMBERS',
  FILTERED_EMPLOYEES = 'FILTERED_EMPLOYEES',
  TEAM_FORM = 'TEAM_FORM',
}

export type TabStackParamList = {
  [NavigationRoutes.EMPLOYEES]: undefined;
  [NavigationRoutes.ADD_EMPLOYEE]: AddEmployeeParams;
  [NavigationRoutes.ALL_MEMBERS]: undefined;
  [NavigationRoutes.FILTERED_EMPLOYEES]: undefined;
  [NavigationRoutes.TEAM_FORM]: AddTeamParams;
};

type EmployeeFormRouteProp = RouteProp<
  TabStackParamList,
  NavigationRoutes.ADD_EMPLOYEE
>;

export type EmployeeFormProps = {
  route: EmployeeFormRouteProp;
};

type TeamFormRouteProp = RouteProp<
  TabStackParamList,
  NavigationRoutes.TEAM_FORM
>;

export type TeamProps = {
  route: TeamFormRouteProp;
};
