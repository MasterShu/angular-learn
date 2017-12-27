import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Comment } from '../../models/product';
import { ProductService } from '../shared/product.service';
import { WebsocketService } from '../shared/websocket.service';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

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

  isWatched = false;
  currentBid: number;

  subscription: Subscription;

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService,
    private wsService: WebsocketService
  ) { }

  ngOnInit() {
    let productId: number;
    productId = this.routeInfo.snapshot.params['productId'];
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
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

  watchProduct() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = true;
      this.subscription = this.wsService.createObservableSocket('ws://localhost:8069', this.product.id)
        .subscribe(
          products => {
            console.log(products);
            let product;
            product = products.find(p => p.productId === this.product.id);
            this.currentBid = product.bid;
          }
        );
    }
  }
}
