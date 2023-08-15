import {
  type Employee,
  setEmployees as setDashboardEmployees
} from '@redux/reducers/dashboard';
import {useDispatch, useSelector} from '@redux/hooks';

type UseDashboard = {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
};

const useDashboard = (): UseDashboard => {
  const dispatch = useDispatch();

  const setEmployees = (employees: Employee[]): void => {
    dispatch(setDashboardEmployees(employees));
  };
  return {
    employees: useSelector((state) => state.dashboard.employees),
    setEmployees: setEmployees
  };
};

export type {UseDashboard};
export default useDashboard;
