import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArticleModel } from '../main-page/main-page.component';
import { RequestService } from '../services/request.service';
import { faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  lock: boolean = false;
  env = environment;
  faCalendar = faCalendar;
  faEdit = faEdit;
  articles: Array<ArticleModel> = new Array<ArticleModel>();
  breadcrumbs: Array<{[key: string]:  Array<string>}> = new Array<{[key: string]:  Array<string>}>();

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.getArticles();

    this.breadcrumbs.push({ key: ["Блог"], value: ["blog"] });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (pageYOffset > document.body.scrollHeight - document.body.clientHeight * 2) {
      this.getArticles();
    }
  }

  getArticles(): void {
    if (!this.lock) {
      this.lock = true;
      this.requestService.get<Array<ArticleModel>>("api/blog/getarticles?skip=" + this.articles.length + "&take=2&lang=" + this.env.language).subscribe(res => { 
        this.articles = this.articles.concat(res);
        this.lock = false;
      });
    }
  }

  loadArticle(): void {
    this.getArticles();
  }
}
