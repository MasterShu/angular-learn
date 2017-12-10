import { Component, OnInit } from '@angular/core';
import { Product } from '../../modules/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Array<Product>;

  constructor() { }

  ngOnInit() {
    this.products = [
       new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
       new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
       new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
       new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
       new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
       new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
       new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
       new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天'])
    ];
  }

}
