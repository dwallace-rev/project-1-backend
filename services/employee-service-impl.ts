import { EmployeeDaoImpl } from "../daos/employee-dao-impl";
import { Employee } from "../entities";
import DuplicateValueError from "../errors/duplicate-value-error";
import { EmployeeService } from "./employee-service";

const employeeDao = new EmployeeDaoImpl()

export class EmployeeServiceImpl implements EmployeeService {


    async createEmployee(employee: Employee): Promise<Employee> {    
        // if (checkUsername(employee.username))
        //     throw new DuplicateValueError(`Username ${employee.username} already exists`);
        return (employeeDao.createEmployee(employee)); 
    }
    getAllEmployees(): Promise<Employee[]> {
        return (employeeDao.getAllEmployees())
    }
    getEmployeeById(id: string): Promise<Employee> {
        return (employeeDao.getEmployeeById(id));
    }
    async modifyEmployeeDetails(updatedEmployee: Employee): Promise<Employee> {
        // const old = await employeeDao.getEmployeeById(updatedEmployee.id)
        // if (!(old.username.toLowerCase() === updatedEmployee.username.toLowerCase())){      
        //     if (checkUsername(updatedEmployee.username))
        //     throw new DuplicateValueError(`Username ${updatedEmployee.username} already exists`);
        // }
        return (employeeDao.modifyEmployee(updatedEmployee));
    }
    deleteEmployee(id: string): Promise<Employee> {
        return (employeeDao.deleteEmployee(id));
    }

}

// async function checkUsername(username: string){
//     const employees: Employee[] = await employeeDao.getAllEmployees()
//     let isduplicate = false;
//         employees.forEach(e=>{
//             if(username.toLowerCase() === e.username.toLowerCase()) 
//             isduplicate = true;
//         })
//     return isduplicate;

// }