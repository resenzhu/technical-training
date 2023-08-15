import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

type Employee = {
  id: number;
  name: string;
  dob: string;
  status: string;
  address: string;
  nik: string;
  npwp: string;
};

type State = {
  employees: Employee[];
};

type Reducers = {
  setEmployees: (state: State, action: PayloadAction<Employee[]>) => void;
};

const name: string = 'dashboard';

const initialState: State = {
  employees: []
};

const reducers: Reducers = {
  setEmployees: (state, action) => {
    if (action.payload !== state.employees) {
      state.employees = action.payload;
    }
  }
};

const slice = createSlice({
  name: name,
  initialState: initialState,
  reducers: reducers
});

export type {Employee};
export const {setEmployees} = slice.actions;
export default slice.reducer;
