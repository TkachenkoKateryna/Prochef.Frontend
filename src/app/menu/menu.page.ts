import { Component, OnInit } from '@angular/core';
import { MenuItemResponse} from '../_models/response/menu-item.response.model';
import { MenuService } from '../_services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menu : MenuItemResponse[];
  public mainDishes: MenuItemResponse[];
  public salads: MenuItemResponse[];
  public desserts: MenuItemResponse[];
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.retriveMenu();
  }

  public retriveMenu(){
    this.menuService.getCurrentMenu().subscribe(data =>{
      this.menu = data;
      this.mainDishes = data.filter( menuItem => menuItem.section === "Main dishes");
      this.salads = data.filter( menuItem => menuItem.section === "Salads");
      this.desserts = data.filter( menuItem => menuItem.section === "Desserts")
    });
  }
}
