import { ExpenseDaoImpl } from "../daos/expense-dao-impl";
import { Expense } from "../entities";
import { ExpenseService } from "./expense-service";

const expenseDao = new ExpenseDaoImpl()

export class ExpenseServiceImpl implements ExpenseService{

    createExpense(expense: Expense): Promise<Expense> {
        return expenseDao.createExpense(expense);
    }
    getAllExpenses(): Promise<Expense[]> {
        return expenseDao.getAllExpenses();
    }
    getExpenseById(id: string): Promise<Expense> {
        return expenseDao.getExpenseById(id);
    }
    modifyExpense(modifiedExpense: Expense): Promise<Expense> {
        return expenseDao.modifyExpense(modifiedExpense);
    }
    deleteExpense(id: string): Promise<Expense> {
        return expenseDao.deleteExpense(id);
    }
    async expenseAction(id: string, approval: Boolean, comment?: string): Promise<Expense> {
        const expense: Expense = await expenseDao.getExpenseById(id);
        if (approval) expense.approved = true;
        else expense.approved = false;

        if (comment !== undefined) expense.comments.push(comment);

        return expense;
    }

}