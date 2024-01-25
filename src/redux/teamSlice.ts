import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {EmployeeData} from '..';

interface TeamState {
  employees: EmployeeData[];
}

const initialState: TeamState = {
  employees: [],
};

const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<EmployeeData>) => {
      state.employees.push(action.payload);
    },
  },
});

export const {addEmployee} = teamSlice.actions;
export default teamSlice.reducer;
