import { EmployeeDaoImpl } from "../daos/employee-dao-impl";
import { Employee } from "../entities";
import BadLoginError from "../errors/bad-login-error";
import BadLogin from "../errors/bad-login-error";
import DuplicateValueError from "../errors/duplicate-value-error";
import NotFoundError from "../errors/not-found-error";
import { EmployeeService } from "./employee-service";

const employeeDao = new EmployeeDaoImpl()

export class EmployeeServiceImpl implements EmployeeService {

    async login(username: string, password: string): Promise<Employee>{
        const employees: Employee[] = await employeeDao.getAllEmployees();
        const employee = employees.find(e=> e.username === username)
        if (!employee) throw new NotFoundError("No employee found with that username");
        if (employee.password === password){
            return employee
        }
        else throw new BadLoginError("Invalid username and password combination");
    }

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