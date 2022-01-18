import { ExpenseDaoImpl } from "../daos/expense-dao-impl"
import { Expense } from "../entities"


describe("Expense request DAO tests", ()=>{

    const expenseDao = new ExpenseDaoImpl();
    let savedExpense: Expense = null;

    it("should create an Expense", async ()=>{
        const expense: Expense = {
            id: "",
            reason:"Just because",
            amount: 935_00,
            requestedBy: "101",
            requestDate: Date.now(),
            pending:true,
            approved: false
        }
        savedExpense = await expenseDao.createExpense(expense);
        expect(savedExpense.id).toBeTruthy();
        expect(savedExpense.amount).toEqual(93500);
    })

    it("should get all expenses", async ()=>{
        const expenses: Expense[] = await expenseDao.getAllExpenses();
        expect (expenses.length).toBeGreaterThan(1);
    })

    it("should get an expense by ID", async ()=>{
        const expense: Expense = await expenseDao.getExpenseById(savedExpense.id)
        expect(expense.id).toBeTruthy();
        expect(expense.requestedBy).toEqual("101");
    })

    it("should modify an existing expense", async ()=>{
        const newExpense: Expense = savedExpense;
        newExpense.approved = true;
        newExpense.comments = ["Approved by Man E. Ger"];
        newExpense.amount = 850_00;
        const expense:Expense = await expenseDao.modifyExpense(newExpense);
        expect(expense.comments).toBeTruthy;
        expect(expense.amount).toEqual(85000);
        expect(expense.approved).toBeTruthy;
    })

    it("should delete an expense", async ()=> {
        const deletedExpense: Expense = await expenseDao.deleteExpense(savedExpense.id)
        expect(deletedExpense.comments).toBeTruthy();
        expect(deletedExpense.reason).toEqual(savedExpense.reason);
    })


})