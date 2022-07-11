import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductRequest } from 'src/app/_models/request/add-product-request.module';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  };

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    let productRequest = new ProductRequest(
      form.value.name,
      +form.value.quantityInStock,
      +form.value.price,
      +form.value.termOfUse,
      +form.value.calories,
      formatDate(form.value.deliveryDate, 'yyyy-MM-dd', 'en'),
      +form.value.placeId,
      +form.value.categoryId,
      false,
      form.value.imgUrl
    )

    this.modalCtrl.dismiss(productRequest, 'confirm');
  }

}
