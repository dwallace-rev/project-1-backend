import cors from "cors";
import express from "express";
import { createLogicalNot } from "typescript";
import { Employee, Expense } from "./entities";
import errorHandler from "./errors/error-handler";
import { EmployeeService } from "./services/employee-service";
import { EmployeeServiceImpl } from "./services/employee-service-impl";
import { ExpenseService } from "./services/expense-service";
import { ExpenseServiceImpl } from "./services/expense-service-impl";


const app = express()
app.use(express.json());
app.use(cors());

const employeeService: EmployeeService = new EmployeeServiceImpl();
const expenseService: ExpenseService = new ExpenseServiceImpl();


// EMPLOYEE ENDPOINTS IN THIS FIRST SECTION
app.get("/employees", async (req, res) => {
    const employees: Employee[] = await employeeService.getAllEmployees();
    res.status(200);
    res.send(employees);
})

app.get("/employees/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const employee: Employee = await employeeService.getEmployeeById(id);
        res.status(200);
        res.send(employee);
    }
    catch (error) {
        errorHandler(error, res, "Employee");
    }
})

app.get("/employees/username/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        const username: string = await employeeService.getUsername(id)
        res.status(200);
        res.send(username);
    } catch (error) {
        errorHandler(error, res, "Employee");
    }
})

app.post("/employees", async (req, res)=>{
    try{
        const employee: Employee = req.body;
        const createdEmployee: Employee = await employeeService.createEmployee(employee);
        res.status(201)
        res.send(employee)
    } catch (error) {
        errorHandler(error, res, "Employee");
    }
})

app.put("/employees/:id", async (req, res) => {
    try {
        const newEmployee: Employee = await employeeService.modifyEmployeeDetails(req.body)
        res.status(200)
        res.send(newEmployee);
    } catch (error) {
        errorHandler(error, res, "Employee");
    }
})

app.delete("/employees/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response: Employee = await employeeService.deleteEmployee(id);
        res.sendStatus(204);

    } catch (error){
        errorHandler(error, res, "Employee");
    }
})
app.patch("/employees/login", async (req, res)=>{
    const {username, password} = req.body;
    try{
        const employee:Employee = await employeeService.login(username, password);
        res.status(200);
        res.send(employee)
    } catch (error){
        errorHandler(error, res, "Login");
    }
})

// EXPENSE ENDPOINTS BELOW THIS POINT

app.get("/expenses", async (req, res)=>{
    const expenses: Expense[] = await expenseService.getAllExpenses();
    res.status(200);
    res.send(expenses);
})

app.get("/expenses/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        const expense: Expense = await expenseService.getExpenseById(id);
        res.status(200)
        res.send(expense);
    } catch (error){
        errorHandler(error, res, "Expense");
    }
})

app.get("/employeeExpenses/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        const expenses: Expense[] = await expenseService.getExpensesByEmployeeId(id);
        res.status(200);
        res.send(expenses);
    } catch (error){
        errorHandler(error, res, "Expense");
    }
})

app.post("/expenses", async (req, res)=>{
    const newExpense: Expense = req.body;
    try{
        const result:Expense = await expenseService.createExpense(newExpense);
        res.status(201);
        res.send(result);
    } catch(error){
        errorHandler(error, res, "Expense")
    }
})


app.put("/expenses/:id", async (req, res)=>{
    const expense: Expense = req.body;
    try {
        const result:Expense = await expenseService.modifyExpense(expense);
        res.status(200);
        res.send(result);
    } catch (error){
        errorHandler(error, res, "Expense");
    }
})

app.delete("/expenses/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        const response: Expense = await expenseService.deleteExpense(id);
        res.sendStatus(204);
    }
    catch (error){
        errorHandler(error, res, "Expense");
    }

})



app.listen(5000, () => console.log("Application started listening on port 5000"))