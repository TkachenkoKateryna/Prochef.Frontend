import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductResponse } from '../_models/response/product.response.model';
import { ProductRequest } from '../_models/request/add-product-request.module';

const API_URL = 'https://prochefwebapi.azurewebsites.net/';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(API_URL + 'products');
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(API_URL + 'products/delete?productId=' + id);
  }

  addProduct(product: ProductRequest) : Observable<any>{
    console.log("here");
    console.log(product);
    const body = new HttpParams()
      .set("name", product.name)
      .set("quantityInStock", product.quantityInStock.toString())
      .set("price", product.price.toString())
      .set("state", "0")
      .set("termOfOUse", product.termOfUse.toString())
      .set("calories", product.calories.toString())
      .set("imgUrl", product.imgUrl)
      .set("placeId", product.placeId.toString())
      .set("categoryId", product.categoryId.toString())
      .set("deliveryDate", product.deliveryDate);

    return this.http.post(API_URL + 'products/add', body);
  }

  editProduct(product: ProductRequest, id: number) : Observable<any>{
    console.log("here");
    console.log(product);
    const body = new HttpParams()
      .set("name", product.name)
      .set("quantityInStock", product.quantityInStock.toString())
      .set("price", product.price.toString())
      .set("state", "0")
      .set("termOfOUse", product.termOfUse.toString())
      .set("calories", product.calories.toString())
      .set("imgUrl", product.imgUrl)
      .set("placeId", product.placeId.toString())
      .set("categoryId", product.categoryId.toString())
      .set("deliveryDate", product.deliveryDate);

    return this.http.post(API_URL + 'products/update?productId='+ id, body);
  }


  getAllProductByPlace(placeName: string): Observable<any>{
    return this.http.get(API_URL + 'productsByPlace?=placeName' + placeName);
  }

  getAllProductsByState(state: string): Observable<any>{
    return this.http.get(API_URL + 'productsByState?=state' + state);
  }

  getAllProductsByCategory(categoryName: string): Observable<any>{
    return this.http.get(API_URL + 'productsByCategory?=categoryName' + categoryName);
  }

  getProductByName(productName: string): Observable<any>{
    return this.http.get(API_URL + 'product?productName=' + productName);
  }
}
