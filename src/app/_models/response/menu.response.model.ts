import {MenuItemResponse} from "./menu-item.response.model"

export class MenuResponse{
    constructor(
        id: number,
        name: string,
        menuItems: MenuItemResponse[]
    ){}
}