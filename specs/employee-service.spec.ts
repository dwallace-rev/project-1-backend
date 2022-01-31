import { Employee } from "../entities";
import { EmployeeServiceImpl } from "../services/employee-service-impl";


describe("Employee Service tests", ()=>{

    const employeeService = new EmployeeServiceImpl();
    const sampleUser: Employee = {
        id: "", fname:"", lname:"", isManager:false, expenses:[],
        username: "testy",
        password: "Pa$$word",
    }
    let createdEmployee:Employee = sampleUser; 


    it("should throw an error on invalid login", async ()=>{

        createdEmployee = await employeeService.createEmployee(sampleUser);
        
        try{
            employeeService.login("testy", "wrongo");
        } catch (error){
            expect(error).toBeTruthy;
        }

        

    })

    it("should return user data on successful login", async ()=>{

      
        // expect(returnedEmployee.id).not.toBe("");
        // expect(returnedEmployee.username).toBe("testy");
        // expect(true)

        
        employeeService.deleteEmployee(createdEmployee.id);
        
    })

})


