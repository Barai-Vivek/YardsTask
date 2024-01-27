export interface EmployeeProps {
  employee: EmployeeData;
  index: number;
  indexes: number[];
  searchText?: string;
  onlyEmployees?: boolean;
}

export interface EmployeeData {
  name: string;
  id: string;
  phoneNumber?: string;
  department?: string;
  team?: string;
  role: string;
  children?: EmployeeData[];
  email?: string;
}

export const initialEmployeeData: EmployeeData = {
  name: '',
  id: '',
  phoneNumber: '',
  email: '',
  department: '',
  team: '',
  role: '',
  children: [],
};

export type TeamMemberDetails = {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
};

export type TeamMemberProp = {
  member: TeamMemberDetails;
  index: number;
};

export type UpdateEmployee = {
  employee: EmployeeData;
  indexes?: number[];
};
