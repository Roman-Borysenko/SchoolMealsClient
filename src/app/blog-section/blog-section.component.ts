import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArticleModel } from '../main-page/main-page.component';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit {

  constructor() { }

  env = environment;

  @Input() title: string = "";
  @Input() articles: Array<Array<ArticleModel>> = new Array<Array<ArticleModel>>();


  ngOnInit(): void {
  }
}
