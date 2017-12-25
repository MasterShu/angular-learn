import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  // 搭配使用的方法, 需要输入属性与输出属性名字符合规则 这样就可以用 [()] 来做双向绑定用
  @Input()
  private rating = 0;
  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  @Input()
  private readonly = true;

  private stars: boolean[];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.stars = [];
    for (let i = 1; i < 6; i++) {
      this.stars.push(i > this.rating);
    }
  }

  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
