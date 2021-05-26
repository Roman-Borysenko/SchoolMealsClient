import { Component, OnInit } from '@angular/core';
import { faShoppingBag, faArrowRight, faShoppingBasket, faUserPlus, faDisease } from '@fortawesome/free-solid-svg-icons';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RequestService } from 'src/app/services/request.service';
import { ChartDataSets, Chart, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AdminService } from 'src/app/services/admin.service';

export interface Statistic {
  label: string;
  data: Array<number>;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  faArrowRight = faArrowRight;
  faShoppingBag = faShoppingBag;
  faShoppingBasket = faShoppingBasket;
  faUserPlus = faUserPlus;
  faDisease = faDisease;

  statistics: Array<Statistic> = new Array<Statistic>();

  userCount: number = 0;
  userWithDiseasesCount: number = 0;
  orderCount: number = 0;
  todayOrderCount: number = 0;

  /*multiselect*/
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  dropdownStudentSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'userName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  classes: Array<{[key:number]: number}> = new Array<{[key:number]: number}> ();
  selectedClass: Array<{ [key: number]: string }> = new Array<{ [key: number]: string }>();
  
  students: Array<any> = new Array<any>();
  selectedStudents: Array<{ [key: string]: string }> = new Array<{ [key: string]: string }>();

  /*--cahrt--*/
  chartData: Array<ChartDataSets> = new Array<ChartDataSets>();
  chartLabels: Label[] = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              min: 0 
          }
        }]
     }
  };
  chartColors: Array<Color> = new Array<Color>();
  chartLegend = true;
  chartType: ChartType = 'bar';
  chartPlugins = [];

  chartTypes: string[] = ['Bar', 'Line'];

  constructor(
    private requestService: RequestService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.requestService.get<number>("api/user/usercount").subscribe(res => { 
      this.userCount = res;
    });

    this.requestService.get<number>("api/user/userwithdiseasescount").subscribe(res => { 
      this.userWithDiseasesCount = res;
    });

    this.requestService.get<number>("api/order/ordercount").subscribe(res => { 
      this.orderCount = res;
    });

    this.requestService.get<number>("api/order/todayordercount").subscribe(res => { 
      this.todayOrderCount = res;
    });

    for (let i = 1; i < 12; i++) {
      let data = { "id": i, "name": i };
      this.classes.push(data);
    }

    this.getStudents();
    this.getStatistic();
  }

  getStudents(): void {
    this.requestService.post<Array<any>>("api/user/getuserbyclasses", this.selectedClass.map(function(item: any) {return item.id ? item.id : item})).subscribe(res => { 
      this.students = res;
    });
  }

  getStatistic(): void {
    let data = {
      "Classes": this.selectedClass.map(function (item: any) { return item.id ? item.id : item }),
      "Stydents": this.selectedStudents.map(function (item: any) { return item.id ? item.id : item })
    };
    this.requestService.post<Array<Statistic>>("api/order/statisticsforcurrentyear", data).subscribe(res => {
      this.statistics = res;

      this.createDataChart();
    });
  }

  createDataChart(): void {
    this.chartData = [];

    for (let i = 0; i < this.statistics.length; i++) {
      this.chartData.push(this.statistics[i]);

      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);

      this.chartColors.push({
        borderColor: 'rgba('+ red + ',' + green + ','+ blue +',0.8)',
        backgroundColor: 'rgba('+ red + ',' + green + ','+ blue +',0.5)',
      });

      this.chartOptions
    }
  }

  onClassSelect(item: any) {
    this.getStudents();
    this.getStatistic();
  }
  onClassSelectAll(items: any) {
    this.getStatistic();
  }
  onClassDeSelect(item: any) {
    this.getStudents();
    this.getStatistic();
  }

  onStudentSelect(item: any) {
    this.getStatistic();
  }
  onStudentSelectAll(items: any) {
    this.getStatistic();
  }
  onStydentDeSelect(items: any) {
    this.getStatistic();
  }

  onSelect(value: any): void {
    let type = this.adminService.converValueToLower(value.value);
    this.chartType = type as ChartType;
  }
}
