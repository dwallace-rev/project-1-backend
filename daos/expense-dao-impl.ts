import { CosmosClient } from "@azure/cosmos";
import { v4 } from "uuid";
import { Expense } from "../entities";
import NotFoundError from "../errors/not-found-error";
import { ExpenseDao } from "./expense-dao";


const dbclient = new CosmosClient(process.env.COSMOS_CONNECTION);
const database = dbclient.database("expense-tracker");
const container = database.container("expenses")

export class ExpenseDaoImpl implements ExpenseDao {

    async createExpense(expense: Expense): Promise<Expense> {
        const response = await container.items.create(expense);
        return response.resource;
    }

    async getAllExpenses(): Promise<Expense[]> {
        const response = await container.items.readAll<Expense>().fetchAll();
        return response.resources;
    }

    async getExpenseById(id: string): Promise<Expense> {
        const response = await container.item(id, id).read();
        if (!response.resource) {
            throw new NotFoundError("Expense with provided ID not found");
        }
        return response.resource;
    }

    async modifyExpense(modifiedExpense: Expense): Promise<Expense> {
        const id = modifiedExpense.id;
        const oldExpense: Expense = await this.getExpenseById(id);
        const response = await container.item(id, id).replace(modifiedExpense);
        return response.resource;
    }

    async deleteExpense(id: string): Promise<Expense> {
        const expense = await this.getExpenseById(id);
        const response = await container.item(id, id).delete();
        return expense;
    }

}