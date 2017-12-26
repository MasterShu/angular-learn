import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../shared/product.service';
import { FormControl } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Array<Product>;
  private keyword: string;
  private titleFilter: FormControl = new FormControl();
  private imgUrl = 'http://via.placeholder.com/320x150';

  constructor(private productService: ProductService) {
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}
