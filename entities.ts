
export interface Employee{
    id: string
    username: string
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
    approved: boolean //default false.
    comment?: string // comment to be left by a manager
}