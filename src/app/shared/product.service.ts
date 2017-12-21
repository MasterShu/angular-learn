import { Injectable } from '@angular/core';
import { Product, Comment } from '../../modules/product';

@Injectable()
export class ProductService {

  constructor() { }

  private products: Product[] = [
    new Product(1, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
    new Product(2, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
    new Product(3, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
    new Product(4, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
    new Product(5, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
    new Product(6, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
    new Product(7, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天']),
    new Product(8, '狄一师', 1.99, 3.5, '这是狄一师, 是我创立的最强一式.', ['地', '天'])
  ];

  private comments: Comment[] = [
    new Comment(1, 1, '2017-10-31 10:21:22', 'alen', 3, '攻击力很高'),
    new Comment(2, 2, '2017-10-31 10:21:22', 'alen', 2, '攻击力高'),
    new Comment(3, 5, '2017-10-31 10:21:22', 'alen', 4, '攻击力很高'),
    new Comment(4, 1, '2017-10-31 10:21:22', 'alen', 5, '攻击力很高'),
    new Comment(5, 3, '2017-10-31 10:21:22', 'alen', 1, '攻击力很低, 不好'),
  ];

  getProducts() {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find((product) => product.id == id);
  }

  // 获取商品的评论
  getCommentsForProductId(id: number): Comment[] {
    return this.comments.filter((comment: Comment) => comment.productId == id);
  }
}
