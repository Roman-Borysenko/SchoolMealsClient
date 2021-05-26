import { Compiler, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

export interface Menu {
  name: string,
  slug: string
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  env = environment;

  faBook = faBook;
  categories: Array<Menu> = new Array<Menu>();

  constructor(
    private requestService: RequestService,
    private compiler: Compiler
  ) { }

  ngOnInit(): void {
    this.requestService.get<Array<Menu>>("api/admin/getadminmenu").subscribe(res => { 
      this.categories = res;
    });
  }

  ngOnDestroy(): void {
    this.compiler.clearCache();
  }
}
