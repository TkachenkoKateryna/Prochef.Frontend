export class ProductResponse {
    constructor(
        public id:string,
        public quantityInStock: number,
        public price: number,
        public termOfUse: number,
        public calories: number,
        public deliveryDate: string,
        public place: string,
        public category:string,
        public isDeleted: boolean,
        public imgUrl: string,
        public state: string
    ){}
 
 }