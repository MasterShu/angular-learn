import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Comment } from '../../models/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  comments: Comment[];
  product: Product;
  newRating = 5;
  newComment = '';
  isCommentHidden = true;

  constructor(private routeInfo: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    let productId: number;
    productId = this.routeInfo.snapshot.params['productId'];
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getCommentsForProductId(productId);
    console.log(this.comments);
  }

  addComment() {
    let comment: Comment;
    comment = new Comment(0, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);

    let sum;
    sum = this.comments.reduce((total, item) => total + item.rating, 0);
    this.product.rating = sum / this.comments.length;

    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }
}
