export interface EmployeeNodeProps {
  node: EmployeeData;
  index: number;
}

export interface EmployeeData {
  name: string;
  id: string;
  phoneNumber?: string;
  department?: string;
  team?: string;
  position: string;
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
  position: '',
};