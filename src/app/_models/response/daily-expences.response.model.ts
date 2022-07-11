export class DailyExpensesResponseModel{
    constructor(
        public key: number,
        public date:string,
        public totalAmount: number
    ){}
} 