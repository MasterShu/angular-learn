import { Injectable, EventEmitter } from '@angular/core';
import { Product, Comment } from '../../models/product';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http: Http) { }

  getAllCategories(): string[] {
    return ['天', '地', '人'];
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').map(res => res.json());
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get('/api/product/' + id).map(res => res.json());
  }

  // 获取商品的评论
  getCommentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get('/api/product/' + id + '/comments').map(res => res.json());
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get('/api/products', {search: this.encodeParams(params)}).map(res => res.json());
  }

  private encodeParams(params: ProductSearchParams) {
    let result: URLSearchParams;
    result = Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: URLSearchParams, key: string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams());
    return result;
  }
}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {}
}
