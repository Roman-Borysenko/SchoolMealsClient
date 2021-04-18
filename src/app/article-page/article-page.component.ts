import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ArticleModel } from '../main-page/main-page.component';
import { RequestService } from '../services/request.service';
import { faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute
  ) { }

  faCalendar = faCalendar;
  faEdit = faEdit;

  env = environment;

  private urlParams: Params = {};

  article: ArticleModel = {} as ArticleModel;
  breadcrumbs: Array<{[key: string]:  Array<string>}> = new Array<{[key: string]:  Array<string>}>();

  ngOnInit(): void {
    this.breadcrumbs.push({ key: ["Блог"], value: ["blog"] });

    this.route.params.subscribe((params: Params) => { 
      this.urlParams = params;
    });

    this.requestService.get<ArticleModel>("api/blog/getarticle?slug=" + this.urlParams.slug).subscribe(res => { 
      this.article = res;
      this.breadcrumbs.push({key: [this.article.title], value: this.breadcrumbs[this.breadcrumbs.length - 1].value.concat([this.article.slug])});
    });
  }

}
