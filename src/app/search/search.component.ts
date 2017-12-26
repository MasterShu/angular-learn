import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  categories: string[];
  formModel: FormGroup;
  constructor(private productService: ProductService) {
    const fb = new FormBuilder;
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  onSearch() {
    if (this.formModel.valid) {
      console.log(this.formModel);
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }

  positiveNumberValidator(control: FormControl): any {
    let price;
    if (!control.value) {
      return null;
    }
    // tslint:disable-next-line:radix
    price = parseInt(control.value);

    if (price > 0) {
      return null;
    } else {
      return {positiveNumber: true};
    }
  }

}
