import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../_services/products.service'
import { ProductResponse } from '../_models/response/product.response.model';
import { ProductRequest } from '../_models/request/add-product-request.module';
import { ModalController } from '@ionic/angular';
import { CreateProductComponent } from './create-product/create-product.component';
import { NgForm } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage implements OnInit {
  public products : ProductResponse[];
  public product: ProductRequest;
  public myInput: string;
  public foodList: any[];
  public foodListBackup: any[];
  selectedPlace: string;
  selectedState: string;
  selectedCategory: string;
  

  constructor(private productService: ProductsService, private modalCtrl: ModalController) { }

  ngOnInit () {
    this.retriveProducts();
    this.selectedPlace = "none";
    this.selectedState = "none";
    this.selectedCategory = "none";
  }

  public retriveProducts (){
    this.productService.getAllProducts().subscribe(data =>{
      this.products = data;
      this.foodList = data;
      this.foodListBackup = this.foodList;
    });
  }


  public onDeleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe();
  }

  public onEditModel(productName, productId){
    this.modalCtrl.create({
      component: EditProductComponent,
      componentProps:{
        name: productName 
      }
    }).then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    })
    .then(resultData => {
      if (resultData.role === "confirm"){
        console.log(resultData);
        this.productService.editProduct(resultData.data, productId).subscribe();
        this.retriveProducts();
      }
    })  
  }

  public onCreateProduct(){
    this.modalCtrl.create({
      component: CreateProductComponent
    }).then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    })
    .then(resultData => {
      if (resultData.role === "confirm"){
        this.productService.addProduct(resultData.data).subscribe();
        this.retriveProducts();
      }
    })  
  }

filterList(evt) {
    this.foodList = this.foodListBackup;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      this.retriveProducts();
      return;
    }

    console.log(searchTerm);
    this.products = this.foodList.filter(currentFood => {
      if (currentFood.name && searchTerm) {
        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  onSubmit(form: NgForm){
    var list: any;

    if(this.selectedPlace != "none") {
      list= this.products.filter(currentFood => {
        return (currentFood.place == this.selectedPlace);
      })
    } 
    if(this.selectedCategory != "none"){
      list = list.filter(currentFood => {
        return (currentFood.category == this.selectedCategory);
      })
    }
    if(this.selectedState != "none"){
      list = list.filter(currentFood => {
        return (currentFood.state == this.selectedState);
      })
    }

    this.products = list;
  }

  discardFilter(){
    this.retriveProducts();
    this.selectedPlace = "none";
    this.selectedState = "none";
    this.selectedCategory = "none";
  }
}

