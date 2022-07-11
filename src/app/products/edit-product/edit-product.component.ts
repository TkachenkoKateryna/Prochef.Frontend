import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { ProductResponse } from 'src/app/_models/response/product.response.model';
import { ProductRequest } from '../../_models/request/add-product-request.module';
import { ProductsService } from '../../_services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  name :string;
  public product: ProductResponse;
  formName: string;
  formQuantityInStock: number;
  formPrice: number;
  formCalories: number;
  formDeliveryDate: string;
  formImgUrl: string;
  formTermOfUse: number;
  formCategoryId: number;
  formPlaceId: number;
  formStateId: number;


  constructor(private modalCtrl: ModalController, private productService: ProductsService, private navParams: NavParams) { 
   }

  ngOnInit() {
    this.name = this.navParams.get('name') ;
    console.log(this.name);
    this.productService.getProductByName(this.name).subscribe(data => {
      console.log(data);
      this.product = data;
      this.formName = data.name;
      this.formQuantityInStock = data.quantityInStock;
      this.formTermOfUse = data.termOfUse;
      this.formPrice = data.price;
      this.formImgUrl = data.imgUrl;
      this.formCalories = data.calories;
      this.formDeliveryDate = data.deliveryDate;
      this.formPlaceId =  data.place == "Fridge" ? 1 : "Storeroom" ? 2 : 3;
      this.formCategoryId =  data.category == "Vegetables" ? 1 : "Fruits" ? 2 : "Dairy" ? 3 : "Meet" ? 4 : "Eggs" ? 5 : "Seafood" ? 6 : 7;
      this.formStateId = data.state == "Fresh" ? 0 : "NeedToBeUsed" ? 1 : 2;
      console.log(this.formPlaceId);
    }); 
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  };


  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    let productRequest = new ProductRequest(
      this.formName,
      this.formQuantityInStock,
      this.formPrice,
      this.formTermOfUse,
      this.formCalories,
      this.formDeliveryDate,
      this.formPlaceId,
      this.formCategoryId,
      false,
      this.formImgUrl
    )

    this.modalCtrl.dismiss(productRequest, 'confirm');
  }


}
