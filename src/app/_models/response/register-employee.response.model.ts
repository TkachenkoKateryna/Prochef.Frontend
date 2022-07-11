export class EmployeeResponseModel{
    constructor(
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public roleId: number,
        public restaurantId: number,
        public ban: boolean,
        public email: string
    ){}
}