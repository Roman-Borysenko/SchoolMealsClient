import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css']
})
export class BreadCrumbsComponent implements OnInit {

  env = environment;
  @Input() breadcrumbs: Array<{[key: string]:  Array<string>}> = new Array<{[key: string]:  Array<string>}>();

  constructor() { }

  ngOnInit(): void {
  }

}
