export enum NavigationRoutes {
  EMPLOYEES = 'EMPLOYEES',
  ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER',
}

export type TabStackParamList = {
  [NavigationRoutes.EMPLOYEES]: undefined;
  [NavigationRoutes.ADD_TEAM_MEMBER]: undefined;
};
