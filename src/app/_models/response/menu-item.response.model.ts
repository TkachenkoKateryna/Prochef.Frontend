import {IngredientResponse} from "./ingredient-response.model"

export class MenuItemResponse {
    constructor(
        id: number,
        section: string,
        name: string,
        price: number,
        timeofTheDay: string,
        description: string,
        imgUrl: string,
        ingredients: IngredientResponse[]
    ){}
}