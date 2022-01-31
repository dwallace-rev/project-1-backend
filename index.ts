import cors from "cors";
import express from "express";
import { Employee, Expense } from "./entities";
import errorHandler from "./errors/error-handler";
import { EmployeeService } from "./services/employee-service";
import { EmployeeServiceImpl } from "./services/employee-service-impl";
import { ExpenseService } from "./services/expense-service";
import { ExpenseServiceImpl } from "./services/expense-service-impl";
import { ILogObject, Logger } from "tslog";
import { appendFileSync } from "fs";
import { idText } from "typescript";


const app = express()
app.use(express.json());
app.use(cors());

const transportLogs: ILogObject[] = [];

const employeeService: EmployeeService = new EmployeeServiceImpl();
const expenseService: ExpenseService = new ExpenseServiceImpl();

function logToTransport(logObject: ILogObject) {
    appendFileSync("logs.log", JSON.stringify(logObject) + "\n");
    appendFileSync("prettylogs.log", `${logObject.logLevel.toUpperCase()}: ${logObject.date.toLocaleString()}: ${logObject.argumentsArray}` + "\n");
}

export const logger: Logger = new Logger();

logger.attachTransport(
    {
        silly: logToTransport,
        debug: logToTransport,
        trace: logToTransport,
        info: logToTransport,
        warn: logToTransport,
        error: logToTransport,
        fatal: logToTransport,
    },
    "debug"
);


// EMPLOYEE ENDPOINTS IN THIS FIRST SECTION
app.get("/employees", async (req, res) => {
    const employees: Employee[] = await employeeService.getAllEmployees();
    logger.debug("GET /employees OK: 200")
    res.status(200);
    res.send(employees);
})

app.get("/employees/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const employee: Employee = await employeeService.getEmployeeById(id);
        res.status(200);
        logger.debug(`GET /employees/${id} OK: 200`)
        res.send(employee);
    }
    catch (error) {
        errorHandler(error, res, "Employee");
        logger.error(`GET /employees/${id} ${error}`)
    }
})

app.get("/employees/username/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const username: string = await employeeService.getUsername(id)
        res.status(200);
        logger.debug(`GET /employees/username/${id} OK: 200`)
        res.send(username);
    } catch (error) {
        errorHandler(error, res, "Employee");
        logger.error(`GET /employees/username/${id} ${error}`)
    }
})

app.post("/employees", async (req, res) => {
    try {
        const employee: Employee = req.body;
        const createdEmployee: Employee = await employeeService.createEmployee(employee);
        res.status(201)
        logger.debug(`POST /employees CREATED: 201 ID: ${createdEmployee.id}`)
        res.send(employee)
    } catch (error) {
        errorHandler(error, res, "Employee");
        logger.error(`POST /employees ${error}`)
    }
})

app.put("/employees/:id", async (req, res) => {
    try {
        const newEmployee: Employee = await employeeService.modifyEmployeeDetails(req.body)
        res.status(200)
        logger.debug(`PUT /employees/${newEmployee.id} OK: 200 (update successful)`)
        res.send(newEmployee);
    } catch (error) {
        errorHandler(error, res, "Employee");
        logger.error(`PUT /employees/${req.body.id} ${error}`)
    }
})

app.delete("/employees/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response: Employee = await employeeService.deleteEmployee(id);
        logger.debug(`DELETE /employees/${id} NO CONTENT: 204 (Successfully deleted)`)
        res.sendStatus(204);
    } catch (error) {
        errorHandler(error, res, "Employee");
        logger.error(`DELETE /employees/${id} ${error}`)
    }
})
app.patch("/employees/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const employee: Employee = await employeeService.login(username, password);
        res.status(200);
        logger.debug(`PATCH /employees/login OK: 200 (Successful login of user ${username})`)
        res.send(employee)
    } catch (error) {
        errorHandler(error, res, "Login");
        logger.error(`PATCH /employees/login USERNAME: ${username} ${error}`);
    }
})

// EXPENSE ENDPOINTS BELOW THIS POINT

app.get("/expenses", async (req, res) => {
    const expenses: Expense[] = await expenseService.getAllExpenses();
    res.status(200);
    logger.debug(`GET /expenses OK: 200`);
    res.send(expenses);
})

app.get("/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const expense: Expense = await expenseService.getExpenseById(id);
        res.status(200)
        logger.debug(`GET /expenses/${id} OK: 200`)
        res.send(expense);
    } catch (error) {
        errorHandler(error, res, "Expense");
        logger.error(`GET /expenses/${id} ${error}`);
    }
})

app.get("/employeeExpenses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const expenses: Expense[] = await expenseService.getExpensesByEmployeeId(id);
        res.status(200);
        logger.debug(`GET /employeeExpenses/${id} OK: 200`)
        res.send(expenses);
    } catch (error) {
        errorHandler(error, res, "Expense");
        logger.error(`GET /employeeExpenses/${id} ${error}`)
    }
})

app.post("/expenses", async (req, res) => {
    const newExpense: Expense = req.body;
    try {
        const result: Expense = await expenseService.createExpense(newExpense);
        res.status(201);
        logger.debug(`POST /expenses CREATED: 201 ID: ${newExpense.id}`)
        res.send(result);
    } catch (error) {
        errorHandler(error, res, "Expense")
        logger.error(`POST /expenses ${error}`)
    }
})


app.put("/expenses/:id", async (req, res) => {
    const expense: Expense = req.body;
    try {
        const result: Expense = await expenseService.modifyExpense(expense);
        res.status(200);
        logger.debug(`PUT /expenses/${expense.id} OK: 200 (successful update)`)
        res.send(result);
    } catch (error) {
        errorHandler(error, res, "Expense");
        logger.error(`PUT /expenses/${expense.id} ${error}`);
    }
})

app.delete("/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response: Expense = await expenseService.deleteExpense(id);
        logger.debug(`DELETE /expenses/${id} NO CONTENT: 204 (Successfully deleted)`);
        res.sendStatus(204);
    }
    catch (error) {
        errorHandler(error, res, "Expense");
        logger.error(`DELETE /expenses/${id} ${error}`);
    }

})



app.listen(process.env.PORT ?? 5000, () => {
    console.log(`Application started`)
    logger.info(`Application started on port ${process.env.PORT ?? 5000}`)
})
