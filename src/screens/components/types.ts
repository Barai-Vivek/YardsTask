export interface EmployeeNodeProps {
  node: EmployeesData;
  index: number;
}

export interface EmployeesData {
  position: string;
  name: string;
  children?: EmployeesData[];
}
