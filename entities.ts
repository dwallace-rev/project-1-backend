
export interface Employee{
    id: string
    username: string
    password: string
    fname: string
    lname: string
    isManager: boolean
    expenses: string[]
}

export interface Expense{
    id: string
    reason: string // description of request
    amount: number // stored in cents
    requestedBy: string //employee ID
    requestDate: number // unix epoch time
    approved: boolean // default false.
    pending: boolean // default true.
    comments?: string[] // comment to be left by a manager
}