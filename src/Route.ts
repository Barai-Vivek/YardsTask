import {RouteProp} from '@react-navigation/native';
import {EmployeeData} from '.';

export type AddTeamMemberParams = {
  employee?: EmployeeData;
  indexes?: number[];
};

export type AddTeamParams = {
  employee?: EmployeeData;
  indexes?: number[];
  addTeam: boolean;
};

export enum NavigationRoutes {
  EMPLOYEES = 'EMPLOYEES',
  ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER',
  ALL_MEMBERS = 'ALL_MEMBERS',
  FILTERED_EMPLOYEES = 'FILTERED_EMPLOYEES',
  TEAM_FORM = 'TEAM_FORM',
}

export type TabStackParamList = {
  [NavigationRoutes.EMPLOYEES]: undefined;
  [NavigationRoutes.ADD_TEAM_MEMBER]: AddTeamMemberParams;
  [NavigationRoutes.ALL_MEMBERS]: undefined;
  [NavigationRoutes.FILTERED_EMPLOYEES]: undefined;
  [NavigationRoutes.TEAM_FORM]: AddTeamParams;
};

type EmployeeFormRouteProp = RouteProp<
  TabStackParamList,
  NavigationRoutes.ADD_TEAM_MEMBER
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
