import { ExpenseDaoImpl } from "../daos/request-dao-impl"
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
            approved: false
        }
        savedExpense = await expenseDao.createExpense(expense);
        expect(savedExpense.id).not.toBeFalsy();
        expect(savedExpense.amount).toEqual(93500);
    })


})