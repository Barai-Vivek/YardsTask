export type EmployeeProps = {
  employee: EmployeeData;
  index: number;
  indexes: number[];
  searchText?: string;
  onlyEmployees?: boolean;
};

export type EmployeeData = {
  name: string;
  id: string;
  phoneNumber?: string;
  department?: string;
  team?: string;
  role: string;
  children?: EmployeeData[];
  email?: string;
};

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

export type UpdateEmployee = {
  employee: EmployeeData;
  indexes?: number[];
  oldTeamIndex?: number;
  teamMemberOldIndex?: number;
};

export const validateEmail = (email: string): boolean => {
  // Regular expression for email validation
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test if the email matches the regex pattern
  return emailRegex.test(email);
};
