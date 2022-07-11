export class ResiterEmployeeRequest{
    constructor(
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public roleId: number,
        public email: string,
        public password: string,
        public restaurantId: number
    ){}
}