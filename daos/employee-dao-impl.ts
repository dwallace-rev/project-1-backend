
import { v4 } from "uuid";
import { Employee } from "../entities";
import { EmployeeDao } from "./employee-dao";
import NotFoundError from "../errors/not-found-error";
import { CosmosClient } from "@azure/cosmos";

const dbclient = new CosmosClient(process.env.COSMOS_CONNECTION);
const database = dbclient.database("expense-tracker");
const container = database.container("employees");

export class EmployeeDaoImpl implements EmployeeDao {



    async createEmployee(employee: Employee): Promise<Employee> {
        employee.id = v4();
        const response = await container.items.create(employee);
        return response.resource;
    }
    async getAllEmployees(): Promise<Employee[]> {
        const response = await container.items.readAll<Employee>().fetchAll();
        return response.resources;
    }
    async getEmployeeById(id: string): Promise<Employee> {
        const response = await container.item(id, id).read();
        if (!response.resource) {
            throw new NotFoundError("Employee with provided ID not found");
        }
        return response.resource;
    }

    async modifyEmployee(modifiedEmployee: Employee): Promise<Employee> {
        const id = modifiedEmployee.id;
        const oldEmployee: Employee = await this.getEmployeeById(modifiedEmployee.id);
        modifiedEmployee.expenses = oldEmployee.expenses; //keep the expenses string unchanged
        const response = await container.item(id, id).replace(modifiedEmployee);
        return response.resource;
    }

    async deleteEmployee(id: string): Promise<Employee> {
        const employee = await this.getEmployeeById(id);
        const response = await container.item(id, id).delete();
        return employee;
    }

}