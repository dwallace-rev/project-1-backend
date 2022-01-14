import { Expense } from "../entities"


export interface ExpenseService{

    createExpense(expense: Expense): Promise<Expense>

    getAllExpenses(): Promise<Expense[]>

    getExpenseById(id: string): Promise<Expense>

    modifyExpense(modifiedExpense: Expense): Promise<Expense>

    deleteExpense(id: string): Promise<Expense>

    expenseAction(id:string, approval: Boolean, comment?: string): Promise<Expense>
}