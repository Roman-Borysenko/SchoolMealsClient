import { Component, OnInit } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { RequestService } from 'src/app/services/request.service';

export interface Menu {
  name: string,
  slug: string
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  faBook = faBook;
  categories: Array<Menu> = new Array<Menu>();

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.requestService.get<Array<Menu>>("api/admin/getadminmenu").subscribe(res => { 
      this.categories = res;
    });
  }

}
