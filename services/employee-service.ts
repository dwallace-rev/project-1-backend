import { Employee } from "../entities";


export interface EmployeeService {

    createEmployee(employee: Employee): Promise<Employee>;

    getAllEmployees(): Promise<Employee[]>

    getEmployeeById(id: string): Promise<Employee>

    modifyEmployeeDetails(updatedEmployee: Employee): Promise<Employee>

    deleteEmployee(id: string): Promise<Employee>

    //TO DO METHODS BELOW
}