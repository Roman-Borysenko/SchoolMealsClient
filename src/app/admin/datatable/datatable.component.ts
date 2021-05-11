import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/services/admin.service';

export interface Scheme {
  name: string,
  slug: string,
  url: any,
  properties: Array<Property>
}

export interface Property {
  propName: string,
  displayData: any,
  type: string,
  imagesSize: Map<string, Array<number>>
}

export interface Data {
  quantity: number,
  data: Array<any>
}

export class Paginator {
  size: number = 0;
  take: number = 2;
  page: number = 1;
  quantityPages: number = 0;
  pages: Array<any> = new Array(0);

  initPaginator(quantity: number): void {
    this.size = quantity;
    this.quantityPages = Math.round(this.size / this.take);
    this.pages = new Array(this.quantityPages);
  }
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  env = environment;
  scheme: Scheme = {} as Scheme;
  result: Data = {} as Data;
  paginator: Paginator = new Paginator();
  urlParams: Params = {};

  constructor(
    private requestService: RequestService,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.urlParams = params;

      this.requestService.get<Scheme>("api/admin/getscheme?modelName=" + this.urlParams.schema + "&operation=Show").subscribe(res => { 
        this.scheme = this.adminService.convertProperyNameForScheme(res);
        this.getData(res, 1);
      });
    });
  }

  getData(scheme: Scheme, pageSet: number = -1): void {
    if (scheme.url.Get) {
      if (pageSet != -1) {
        this.paginator.page = pageSet;
      }

      this.requestService.get<Data>(scheme.url.Get + "?skip=" + ((this.paginator.page * this.paginator.take) - this.paginator.take) + "&take=" + this.paginator.take + "&lang=" + this.env.language).subscribe(res => { 
        this.result = res;
  
        this.paginator.initPaginator(res.quantity);
      });
    }
  }

  onDelete(id: number): void {
    this.requestService.get<Data>(this.scheme.url.Delete + "?id=" + id).subscribe(res => { 
      this.getData(this.scheme);
    });
  }

  onClickNumBtn(page: number): void {
    this.paginator.page = page;
    this.getData(this.scheme);
  }

  onClickPrevBtn(): void {
    if (this.paginator.page > 1) {
      this.paginator.page--;
      this.getData(this.scheme);
    }
  }

  onClickNextBtn(): void {
    if (this.paginator.page < this.paginator.quantityPages) {
      this.paginator.page++;
      this.getData(this.scheme);
    }
  }

}
