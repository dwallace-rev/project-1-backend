import { Employee } from "../entities";


export interface EmployeeDao {

    createEmployee(employee: Employee): Promise<Employee>

    getAllEmployees(): Promise<Employee[]>

    getEmployeeById(id: string): Promise<Employee>

    modifyEmployee(modifiedEmployee: Employee): Promise<Employee>

    deleteEmployee(id: string): Promise<Employee>
}