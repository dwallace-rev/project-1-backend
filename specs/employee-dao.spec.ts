
import { EmployeeDaoImpl } from "../daos/employee-dao-impl"
import { Employee } from "../entities";


describe("Employee DAO tests", ()=>{

    const employeeDao = new EmployeeDaoImpl();
    let savedEmployee:Employee = null;

    it("should create a new Employee", async ()=>{
        const employee:Employee = {
            id:"", 
            username: "CaptainYesterday", 
            fname:"Philip", 
            lname:"Fry", 
            expenses:[], 
            isManager: false}
        savedEmployee = await employeeDao.createEmployee(employee);
        expect(savedEmployee.id).not.toBeFalsy;
    })

    it("should get an Employee by ID", async ()=>{
        const employee = await employeeDao.getEmployeeById(savedEmployee.id)
        expect(employee.username).toEqual(savedEmployee.username)
    })

    it("should get all Employees", async ()=>{
        const employees: Employee[] = await employeeDao.getAllEmployees();
        expect(employees.length).toBeGreaterThan(1);
    })

    it("should modify an existing employee", async()=>{
        const newEmployee :Employee = {
            id: savedEmployee.id,
            username: "superking",
            fname: "Bender",
            lname: "Rodriguez",
            expenses: savedEmployee.expenses,
            isManager: true
        }
        const employee: Employee = await employeeDao.modifyEmployee(newEmployee);
        expect(employee.id).toEqual(savedEmployee.id)
        expect(employee.username).toEqual("superking");
        expect(employee.isManager).toBe(true);
        savedEmployee = employee;
    })

    it("should delete an Employee", async ()=>{
        const response = await employeeDao.deleteEmployee(savedEmployee.id)
        expect(response.username).toEqual(savedEmployee.username)
    })




})