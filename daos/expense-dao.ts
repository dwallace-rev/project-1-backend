import {Expense} from "../entities"

export interface ExpenseDao{

    createExpense(Expense: Expense): Promise<Expense>;

    getAllExpenses(): Promise<Expense[]>;

    getExpenseById(id:string): Promise<Expense>;

    modifyExpense(modifiedExpense: Expense): Promise<Expense>;

    deleteExpense(id: string): Promise<Expense>;
}