import { Injectable } from '@angular/core';
import { Scheme } from '../admin/datatable/datatable.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  convertProperyNameForScheme(scheme: Scheme): Scheme {
    for (let i = 0; i < scheme.properties.length; i++) {
      let propery = scheme.properties[i].propName;
      scheme.properties[i].propName = propery[0].toLowerCase() + propery.substr(1);
    }

    return scheme;
  }

  convertProperyNameToLower(data: any): any {
    for (let i = 0; i < data.length; i++) {
      let propery = data.properties[i].propName;
      data.properties[i].propName = this.converValueToLower(propery);
    }

    return data;
  }

  converValueToLower(value: string): string {
    return value[0].toLowerCase() + value.substr(1);
  }

  convertProperyNameToUpper(data: any): any {
    let newObject = {};
    for (let item in data ) {
      // data.key = data.key[0].toUpperCase() + data.key.substr(1);
      // delete Object.assign(data, { [item[0].toLowerCase() + item.substr(1)]: data[item] })[item];
      delete Object.assign(newObject, data, {[item[0].toUpperCase() + item.substr(1)]: data[item] })[item];
      console.log(item);
    }

    return newObject;
  }
}
