import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit {

  constructor() { }

  articles: Array<Array<any>> = new Array<Array<any>>();

  ngOnInit(): void {
    var articles = new Array<any>(4,2,3,4);
    this.articles = this.chunk(articles, 2);

    console.log(this.articles)
  }

  chunk(array: Array<any>, size: number): Array<Array<any>> {
    var i = 0, j = array.length;
    var temparray = new Array<Array<any>>();

    for (; i<j; i+=size) {
      temparray.push(array.slice(i,i+size));
    }

    return temparray;
  }

}
