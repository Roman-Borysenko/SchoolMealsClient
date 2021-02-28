import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForwardingMessagesService {

  constructor() { }

  private _trigger = new Subject<void>();

  get trigger() {
    return this._trigger.asObservable();
  }

  public triggerOnShowPopup() { 
    this._trigger.next();
  }
}
