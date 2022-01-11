import cors from "cors";
import express from "express";
import { EmployeeDao } from "./daos/employee-dao";
import { EmployeeDaoImpl } from "./daos/employee-dao-impl";
import { Employee } from "./entities";
import errorHandler from "./errors/error-handler";


const app = express()
app.use(express.json());
app.use(cors());

const employeeDao: EmployeeDao = new EmployeeDaoImpl();


app.get("/employees", async (req, res) => {
    const employees: Employee[] = await employeeDao.getAllEmployees();
    res.status(200);
    res.send(employees);
})

app.get("/employees/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const employee: Employee = await employeeDao.getEmployeeById(id);
        res.status(200);
        res.send(employee);
    }
    catch (error) {
        errorHandler(error, res, "Employee");
    }
})

app.post("/employees", async (req, res)=>{
    const employee: Employee = req.body;
    const createdEmployee: Employee = await employeeDao.createEmployee(employee);
    res.status(201)
    res.send(employee)
})

app.put("/employees/:id", async (req, res) => {
    try {
        const newEmployee: Employee = await employeeDao.modifyEmployee(req.body)
        res.status(200)
        res.send(newEmployee);
    } catch (error) {
        errorHandler(error, res, "Employee");
    }
})

app.delete("/employees/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response: Employee = await employeeDao.deleteEmployee(id);
        res.status(204)
        res.send(`Deleted Employee: ${response}`)

    } catch (error){
        errorHandler(error, res, "Employee");
    }
})



app.listen(5000, () => console.log("Application started listening on port 5000"))