export class ProductRequest {
    constructor(
        public name: string,
        public quantityInStock: number,
        public price: number,
        public termOfUse: number,
        public calories: number,
        public deliveryDate: string,
        public placeId: number,
        public categoryId: number,
        public isDeleted: boolean,
        public imgUrl: string
    ){}
 }