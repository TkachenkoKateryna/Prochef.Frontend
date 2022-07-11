import { DailyExpensesResponseModel } from "./daily-expences.response.model";
import { ExpenseProductResponse } from "./expense.product.model";

export class ExpensesResponse{
    constructor(
        public products: ExpenseProductResponse[],
        public totalDailyExpenses: DailyExpensesResponseModel[],
        public minDay: string,
        public maxDay: string
    ){}
}