import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CroppedEvent } from 'ngx-photo-editor';
import { AdminService } from 'src/app/services/admin.service';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import { Scheme } from '../datatable/datatable.component';

export class FormType {
  Text: string = "Text";
  List: string = "List";
  Number: string = "Number";
  MultilineText: string = "MultilineText";
  Image: string = "Image";
  CheckBox: string = "CheckBox";
  Multiselect: string = "Multiselect";
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  env = environment;
  formType: FormType = new FormType();
  isCropped: boolean = false;
  errors: Array<string> | undefined;
  showErrorPopup: boolean = false;
  scheme: Scheme = {} as Scheme;
  
  result: any;
  images: any = {};

  relatedData: any = {};
  urlParams: Params = {};

  imageChangedEvent: any;

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(
    private requestService: RequestService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.urlParams = params;
    });

    this.requestService.get<Scheme>("api/admin/getscheme?modelName=" + this.urlParams.schema + "&operation=" + (this.urlParams.slug ? "Edit" : "Add")).subscribe(res => { 
      this.scheme = this.adminService.convertProperyNameForScheme(res);
      this.getData(res);
      this.getRelatedData(res);
    });
  }

  getData(scheme: Scheme): void {
    if (scheme.url.Get) {
      this.requestService.get<any>(scheme.url.Get + "?slug=" + (this.urlParams.slug ? this.urlParams.slug : "model")).subscribe(res => { 
        this.result = res;
        this.getImages(res);
      });
    }
  }

  getRelatedData(scheme: Scheme): void {
    if (scheme.properties && scheme.properties.length > 0) {
      for (let i = 0; i < scheme.properties.length; i++) {
        if (scheme.properties[i].displayData.RelatedData) {
          this.requestService.get<any>(scheme.properties[i].displayData.RelatedData + "?lang=" + this.env.language).subscribe(res => { 
            this.relatedData[scheme.properties[i].propName] = res;
          });
        }
      }
    }
  }

  getImages(data: any): void {
    let imagesSize: Array<string> = ["Min", "Midd", "Max"];

    if (data.image) {
      let imagesArray: Array<string> = data.image.split('|');
      for (let size in imagesSize) {
        let image = imagesArray.find(i => i.match(imagesSize[size].toLowerCase()) != null);
        if (image) {
          this.images[imagesSize[size]] = this.env.address + "/" +  image;
        }
      }
    } 
  }

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: CroppedEvent, imageSize: string) {
    this.images[imageSize] = event.base64;
    this.isCropped = true;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSent($event: any): void {
    $event.stopPropagation();
    $event.preventDefault();

    if (this.scheme.url.Send) {
      let request = null;

      if (this.result.ingredientsIds) {
        this.result.ingredientsIds = this.result.ingredientsIds.map(function(item: any) {return item.id ? item.id : item})
      }

      if (this.result.tagsIds) {
        this.result.tagsIds = this.result.tagsIds.map(function(item: any) {return item.id ? item.id : item})
      }

      if (this.result.image !== undefined) {
        if (Object.values(this.images).length > 0)
          this.result.image = "true";

        request = {
          "Data": this.result,
          "Images": this.isCropped ? this.images : null
        };
      }

      this.requestService.post<any>(this.scheme.url.Send, request != null ? request : this.result).subscribe(res => { 
        this.router.navigate(['/admin/' + this.scheme.slug]);
      }, error => {
        console.log(error)
        if (error.error.errors !== undefined)
          this.errors = (Object.values(error.error.errors) as any).flat();
        else
          this.errors = (Object.values(error.error) as any).flat();
        
        this.showErrorPopup = true;
      });
    }
  }

}
